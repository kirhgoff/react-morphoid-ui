import React from 'react';

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

const COLOR_CORPSE = [100, 100, 100, 255];
const COLOR_NOTHING = [0, 0, 0, 255];

export default function CanvasRenderer(props) {

    function prepareColors(data) {
        function assignMax(storage, key, candidate) {
            if (storage[key] < candidate) storage[key] = candidate;
        }

        const extremes = data
            .filter(arr => arr[0] === "cell")
            .reduce(
                (extremes, data) => {
                    assignMax(extremes, "reproduces", data[0]);
                    assignMax(extremes, "attacks", data[1]);
                    assignMax(extremes, "photosynthesis", data[2]);
                    assignMax(extremes, "defiles", data[3]);

                    return extremes;
                },
                // Default values
                {
                    "reproduces": 0,
                    "attacks": 0,
                    "photosynthesis": 0,
                    "defiles": 0
                });

        return data.map((arr) => {
            const cellType = arr[0];
            if (cellType === "corpse") return COLOR_CORPSE;
            else if (cellType === "nothing") return COLOR_NOTHING;
            else {
                const reproduces = arr[1];      // r
                const attacks = arr[2];         // g
                const photosynthesis = arr[3];  // b
                const defiles = arr[4];

                const brightness = 250 * (1 - defiles/extremes["defiles"]);

                const red = attacks/extremes["attacks"] * brightness;
                const green = photosynthesis/extremes["photosynthesis"] * brightness;
                const blue = reproduces/extremes["reproduces"] * brightness;

                return [red, green, blue, 255];
            }
        })
    }

    // ctx - context to paint
    // width - number of cells on axis x
    // height - number of cells on axis y
    // pixels - array of color values, presented as [r, g, b, a]
    function updateCanvas(ctx, width, height, pixels) {
        // console.log("GameDisplay.updateCanvas: state", this.state);
        const cellWidth = 10;
        const cellHeight = 10;

        let imageWidth = width * cellWidth;
        let imageHeight = height * cellHeight;

        //console.log("DEBUG: width: ", width, "height: ", height, "dataIn: ", dataIn);

        let imageData = ctx.getImageData(0,0, imageWidth, imageHeight);
        let indexOut = 0;

        // TODO: fix empty first line
        for (let pixelIndex = 0; pixelIndex < pixels.length; pixelIndex ++) {

            const cellColors = pixels[pixelIndex];

            // Scaling dx x dy
            for (let dx = 0; dx < cellWidth; dx++) {
                for (let dy = 0; dy < cellHeight; dy++) {

                    let cellIndex = indexOut + 4 * dx + 4 * imageWidth * dy;

                    imageData.data[cellIndex] = cellColors[0]; // red
                    imageData.data[cellIndex + 1] = cellColors[1]; // green
                    imageData.data[cellIndex + 2] = cellColors[2]; // blue
                    imageData.data[cellIndex + 3] = cellColors[3]; // alpha
                }
            }
            // if (pixelIndex % width !== 0) {
            //     indexOut += 4 * cellWidth;
            // } else {
            //     indexOut += 4 * imageWidth * (cellHeight - 1);
            // }
            if (pixelIndex % width !== 0) {
                indexOut += 4 * cellWidth;
            } else {
                indexOut += 4 * imageWidth * (cellHeight - 1);
            }

        }

        ctx.putImageData(imageData, 0, 0);
    }

    console.log("PAYLOAD:", props.payload);

    const canvasRef = React.useRef(null);

    if (props.payload) {
        const {width, height, data} = props.payload; // TODO: return meta with min/max

        if (data) {
            const colors = prepareColors(data); // TODO: pass meta to use min/max values?
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

