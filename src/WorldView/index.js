import React from 'react';
import generateColorsForWorld from './generateColorsForWorld'

// TODO: created another renderer with that
// const colorMap = new Map([
//     [' ', ], // empty space
//     ['+', [100, 100, 100, 255]], // corpse
//     ['*', [100, 200, 100, 255]], // reproduces
//     ['x', [200, 100, 100, 255]], // attacks
//     ['o', [200, 200, 100, 255]], // photosynthesis
//     ['@', [200, 100, 200, 255]], // defiles
//     ['.', [100, 200, 200, 255]], // weird
// ]);


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

    const payload = props.payload;
    console.log("PAYLOAD:", payload);

    const canvasRef = React.useRef(null);

    if (payload) {
        const {width, height, data} = payload; // TODO: return meta with min/max

        if (data) {
            const colors = generateColorsForWorld(data); // TODO: pass meta to use min/max values?
            const ctx = canvasRef.current.getContext('2d');
            updateCanvas(ctx, width, height, colors);
        }
    }

    return (
        <div>
            <h1>Oh, brave new world!</h1>
            <canvas
                id="canvas_01"
                ref={canvasRef}
                width={400}
                height={400}
                className="bordered"/>
        </div>
    );
}
