import React from 'react';

export default function LegendPanel(props) {
    function colorFor(array) {
        return "#" + array.slice(0, 3).map((num) => num.toString(16)).join('');
    }

    return (
        <div className="legend bordered legend-width">
            {props.colorMap.map(([key, value]) => (
                <div key={key}>
                    <span className="bordered" style={{background: colorFor(value)}}/>
                     {props.typeNames.get(key)}
                </div>
            ))}
        </div>
    );
}