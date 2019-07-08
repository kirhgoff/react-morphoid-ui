import React, { useState } from "react";
import CellDNARenderer from "./CellDNARenderer";
import ControlPanel from "../ControlPanel";

export default class CellViewController extends React.Component {
    constructor(props) {
        super(props);
        this.state = { x: 0, y: 0 };
    }

    componentDidMount() {
       setInterval( () => {this.reload()},1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    reload() {
        fetch('/entity/' + this.state.x + '/' + this.state.y)
            .then(response => {
                return response.json();
            })
            .then(payload => {
                console.log("Fetching data");
                this.setState({x: this.state.x, y: this.state.y, payload: payload});
            })
            .catch(function (error) {
                console.log('Error: >>>', error);
            });
    }

    render() {
        const { payload } = this.state;

        return (
            <CellDNARenderer payload={payload}/>
        );
    }
}