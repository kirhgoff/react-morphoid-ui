import React from 'react';

const LegendPanel = ({ colorMap }) => (
    <ul>
        {colorMap.map(([key, value]) => (
            <li>
                {key}-{value}
            </li>
        ))}
    </ul>
);

export default LegendPanel;