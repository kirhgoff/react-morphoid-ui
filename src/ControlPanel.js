import React from 'react';

import CanvasRenderer from "./CanvasRenderer";
import LegendPanel from "./LegendPanel";

// function getColorIndicesForSymbol(symbol) {
//     if (symbol === ' ') { return [255, 255, 255, 255] } // empty space
//     if (symbol === '+') { return [100, 100, 100, 255] } // corpse
//     if (symbol === '*') { return [100, 200, 100, 255] } // reproduces
//     if (symbol === 'x') { return [200, 100, 100, 255] } // attacks
//     if (symbol === 'o') { return [200, 200, 100, 255] } // photosynthesys
//     if (symbol === '@') { return [200, 100, 200, 255] } // defiles
//     if (symbol === '.') { return [100, 200, 200, 255] } // weird
//
//     return [255, 255, 255, 255];
// }

const colorMap = new Map([
    [' ', [255, 255, 255, 255]], // empty space
    ['+', [100, 100, 100, 255]], // corpse
    ['*', [100, 200, 100, 255]], // reproduces
    ['x', [200, 100, 100, 255]], // attacks
    ['o', [200, 200, 100, 255]], // photosynthesys
    ['@', [200, 100, 200, 255]], // defiles
    ['.', [100, 200, 200, 255]], // weird
]);


function ControlPanel(props) {
    return (
        <div>
            <CanvasRenderer colorMap={ colorMap }/>
            <LegendPanel colorMap={ Array.from(colorMap) } />
        </div>
    );
}

export default ControlPanel;