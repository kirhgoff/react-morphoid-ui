import React from 'react';
import PropTypes from "prop-types";

export default function WorldView(props) {
    // ctx - context to paint
    // width - number of cells on axis x
    // height - number of cells on axis y
    // pixels - array of color values, presented as [r, g, b, a]
    function updateCanvas(ctx, fieldWidth, fieldHeight, inputData) {
        function moveToNextCell(imageDataIndex, inputDataIndex, fieldWidth, imageWidth, cellWidth, cellHeight) {
            // we are moving right by 4*cellWidth
            // when we reach right side, we go to the next line
            // jumping down by cellHeight - 1
            imageDataIndex += 4 * cellWidth;

            if ((inputDataIndex + 1) % fieldWidth === 0) {
                imageDataIndex += 4 * imageWidth * (cellHeight - 1);
            }
            return imageDataIndex;
        }

        const cellWidth = 10;
        const cellHeight = 10;

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

            imageDataIndex = moveToNextCell(
                imageDataIndex,
                inputDataIndex,
                fieldWidth,
                imageWidth,
                cellWidth,
                cellHeight
            );

        }

        ctx.putImageData(imageData, 0, 0);
    }

    // Hooks go first
    const canvasRef = React.useRef(null);

    if (props.payload) {
        const {width, height, data} = props.payload; // TODO: return meta with min/max

        if (data) {
            const colors = props.paletteProvider(data);
            const ctx = canvasRef.current.getContext('2d');
            updateCanvas(ctx, width, height, colors);
        }
    }

    return (
        <div>
            <canvas
                id="canvas_01"
                ref={canvasRef}
                width={400}
                height={400}
                className="bordered"/>
        </div>
    );
};

WorldView.propTypes = {
    payload: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
        data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any))
    }),
    paletteProvider: PropTypes.func.isRequired
};

