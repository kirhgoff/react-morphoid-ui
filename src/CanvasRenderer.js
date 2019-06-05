import React from 'react';

class CanvasRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: null, colorMap: props.colorMap };
    }

    componentDidMount() {
        setInterval( () => {this.reload()},1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidUpdate() {
        this.updateCanvas();
    }

    reload() {
        fetch('/world/get')
            .then(response => {
                const result = response.json();
                console.log("Result: >>>>> ", result);
                return result;
            })
            .then(data => this.setState({
                width: data.width,
                height: data.height,
                data: data.data
            }))
            .catch(function(error) {
                console.log('Error: >>>', error);
            });
    }

    updateCanvas() {
        console.log("GameDisplay.updateCanvas");
        const width = parseInt(this.state.width, 10);
        const height = parseInt(this.state.height, 10);
        const dataIn = this.state.data;

        const cellWidth = 10;
        const cellHeight = 10;

        let imageWidth = width*cellWidth;
        let imageHeight = height*cellHeight;

        //console.log("DEBUG: width: ", width, "height: ", height, "dataIn: ", dataIn);

        const ctx = this.refs.canvas.getContext('2d');
        let imageData = ctx.getImageData(0,0, imageWidth, imageHeight);
        let dataOut = imageData.data;

        let indexOut = 0;

        for (let indexIn = 0; indexIn < dataOut.length; indexIn ++) {
            if (dataIn[indexIn] !== '\n') {
                const colors = this.state.colorMap[dataIn[indexIn]];

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

    render() {
        return (
            <div>
                <h1>Oh, brave new world!</h1>
                <canvas id="canvas_01" ref="canvas" width={400} height={400} className="bordered"/>
            </div>
        );
    }
}

export default CanvasRenderer;

