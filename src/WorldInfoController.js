import React from "react";
import ControlPanel from "./ControlPanel";

export default class WorldInfoController extends React.Component {
    constructor(props) {
        super(props);
        this.state = { payload: null };
    }

    componentDidMount() {
        setInterval( () => {this.reload()},1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    reload() {
        fetch('/world/get')
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
            <ControlPanel payload={payload}/>
        );
    }
}