import React from "react";
import CellDNARenderer from "./CellDNARenderer";

export default class CellViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { x: 0, y: 0, payload: null };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch('/entity/' + this.state.x + '/' + this.state.y)
            .then(response => {
                return response.json();
            })
            .then(payload => this.setState({payload: payload}))
            .catch(function(error) {
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