import React from 'react';

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
        console.log("Prepare colors for", data);
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

        console.log("Calculated extremes: ", extremes);

        return data.map((arr) => {
            const cellType = arr[0];
            if (cellType === "corpse") return COLOR_CORPSE;
            else if (cellType === "nothing") return COLOR_NOTHING;
            else {
                const reproduces = arr[1];
                const attacks = arr[2];
                const photosynthesis = arr[3];
                const defiles = arr[4];

                const brightness = 250 * (1 - defiles/extremes["defiles"]);

                const red = attacks/extremes["attacks"] * brightness;
                const green = photosynthesis/extremes["photosynthesis"] * brightness;
                const blue = reproduces/extremes["reproduces"] * brightness;

                return [red, green, blue, 255];
            }
        })
    }

    // width - number of cells on axis x
    // height - number of cells on axis y
    // cells - array of color values, presented as [r, g, b, a]
    function updateCanvas(ctx, width, height, colors) {
        // console.log("GameDisplay.updateCanvas: state", this.state);
        const cellWidth = 10;
        const cellHeight = 10;

        let imageWidth = width * cellWidth;
        let imageHeight = height * cellHeight;

        //console.log("DEBUG: width: ", width, "height: ", height, "dataIn: ", dataIn);

        let imageData = ctx.getImageData(0,0, imageWidth, imageHeight);
        let dataOut = imageData.data;

        let indexOut = 0;

        // TODO: fix all that there is only one index
        for (let indexIn = 0; indexIn < dataOut.length; indexIn ++) {
            if (indexIn % width !== 0) {
                const colors = colors[indexIn];
                for (let dx = 0; dx < cellWidth; dx ++) {
                    for (let dy = 0; dy < cellHeight; dy ++) {
                        let cellIndex = indexOut + 4 * dx + 4 * imageWidth * dy;
                        imageData.data[cellIndex] = colors[0]; // red
                        imageData.data[cellIndex + 1] = colors[1]; // green
                        imageData.data[cellIndex + 2] = colors[2]; // blue
                        imageData.data[cellIndex + 3] = colors[3]; // alpha
                    }
                }

                indexOut += 4 * cellWidth;
            } else {
                indexOut += 4 * imageWidth * (cellHeight - 1);
            }
        }

        ctx.putImageData(imageData, 0, 0);
    }

    const { width, height, data, meta } = props.payload;
    const canvasRef = React.useRef(null);

    if (data) {
        const colors = prepareColors(data); // TODO: pass meta to use min/max values?

        //const ctx = this.refs.canvas.getContext('2d');
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        updateCanvas(ctx, width, height, colors);
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

