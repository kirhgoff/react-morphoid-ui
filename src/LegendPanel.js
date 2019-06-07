import React from 'react';

export default class LegendPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colorMap: this.props.colorMap,
            typeNames: this.props.typeNames
        };
    }

    static colorFor(array) {
        return "#" + array.slice(0, 3).map((num) => num.toString(16)).join('');
    }

    render() {
        return (
            <div className="legend bordered legend-width">
                {this.state.colorMap.map(([key, value]) => (
                    <div>
                        <span className="bordered" style={{background: LegendPanel.colorFor(value)}}/>
                         {this.state.typeNames.get(key)}
                    </div>
                ))}
            </div>
        );
    }
}
