import React from 'react';

class LegendPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colorMap: this.props.colorMap,
            typeNames: this.props.typeNames
        };
    }
    render() {
        return (
            <ul className="bordered no-discs">
                {this.state.colorMap.map(([key, value]) => (
                    <li className="legend">
                        <div className="bordered sample legend" style={{background: this.state.color}}>&nbsp;</div>
                        <div className="legend">{this.state.typeNames.get(key)}</div>
                    </li>
                ))}
            </ul>
        );
    }
}
export default LegendPanel;