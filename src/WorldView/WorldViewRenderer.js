import React from 'react';
import PropTypes from "prop-types";

// ctx - context to paint
// width - number of cells on axis x
// height - number of cells on axis y
// pixels - array of color values, presented as [r, g, b, a]
function updateCanvas(ctx, inputData, fieldWidth, fieldHeight, cellWidth, cellHeight) {
    let imageWidth = fieldWidth * cellWidth;
    let imageHeight = fieldHeight * cellHeight;

    let imageData = ctx.getImageData(0, 0, imageWidth, imageHeight);
    let imageDataIndex = 0;

    for (let inputDataIndex = 0; inputDataIndex < inputData.length; inputDataIndex++) {
        const cellColors = inputData[inputDataIndex];

        // Scaling dx x dy
        for (let dx = 0; dx < cellWidth; dx++) {
            for (let dy = 0; dy < cellHeight; dy++) {

                let cellIndex = imageDataIndex + 4 * dx + 4 * dy * imageWidth;

                imageData.data[cellIndex] = cellColors[0]; // red
                imageData.data[cellIndex + 1] = cellColors[1]; // green
                imageData.data[cellIndex + 2] = cellColors[2]; // blue
                imageData.data[cellIndex + 3] = cellColors[3]; // alpha
            }
        }

        imageDataIndex += 4 * cellWidth;
        if ((inputDataIndex + 1) % fieldWidth === 0) {
            imageDataIndex += 4 * imageWidth * (cellHeight - 1);
        }

        // imageDataIndex = moveToNextCell(
        //     imageDataIndex,
        //     inputDataIndex,
        //     fieldWidth,
        //     imageWidth,
        //     cellWidth,
        //     cellHeight
        // );

    }

    ctx.putImageData(imageData, 0, 0);
}

// function moveToNextCell(imageDataIndex, inputDataIndex, fieldWidth, imageWidth, cellWidth, cellHeight) {
//     // we are moving right by 4*cellWidth
//     // when we reach right side, we go to the next line
//     // jumping down by cellHeight - 1
//     imageDataIndex += 4 * cellWidth;
//
//     if ((inputDataIndex + 1) % fieldWidth === 0) {
//         imageDataIndex += 4 * imageWidth * (cellHeight - 1);
//     }
//     return imageDataIndex;
// }



function translateClickToCell(event, canvas, cellWidth, cellHeight) {
    const boundaries = canvas.getBoundingClientRect();
    const x = event.clientX - boundaries.left;
    const y = event.clientY - boundaries.top;

    return {
        x: Math.trunc(x / cellWidth),
        y: Math.trunc(y / cellHeight)
    };
}

function drawCrosshair(ctx, x, y, width, height, cellWidth, cellHeight) {
    ctx.beginPath();
    ctx.moveTo(x * cellWidth, 0);
    ctx.lineTo(x * cellWidth, height * cellHeight);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo((x + 1) * cellWidth, 0);
    ctx.lineTo((x + 1) * cellWidth, height * cellHeight);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, y * cellHeight);
    ctx.lineTo(width * cellWidth, y * cellHeight);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, (y + 1) * cellHeight);
    ctx.lineTo(width * cellWidth, (y + 1) * cellHeight);
    ctx.stroke();
}

export default function WorldViewRenderer(props) {
    const canvasRef = React.useRef(null);

    if (props.payload) {
        const { x, y } = props.coords;
        const { width, height, data } = props.payload; // TODO: return meta with min/max
        const { cellWidth, cellHeight } = props;

        if (data) {
            const colors = props.paletteProvider(data);
            const ctx = canvasRef.current.getContext('2d');
            updateCanvas(ctx, colors, width, height, cellWidth, cellHeight);
            drawCrosshair(ctx, x, y, width, height, cellWidth, cellHeight);
        }
    }

    return (
        <canvas
            onClick={
                (event) => {
                    const result = translateClickToCell(
                        event,
                        canvasRef.current,
                        props.cellWidth,
                        props.cellHeight
                    );
                    props.clickHandler(result);
                }
            }
            id="canvas_01"
            ref={canvasRef}
            width={400}
            height={400}
            className="bordered"/>
    );
};

WorldViewRenderer.propTypes = {
    coords: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
    }).isRequired,
    cellWidth: PropTypes.number.isRequired,
    cellHeight: PropTypes.number.isRequired,
    paletteProvider: PropTypes.func.isRequired,
    clickHandler: PropTypes.func.isRequired,
    payload: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any))
    })
};

