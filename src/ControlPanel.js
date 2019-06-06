import React from 'react';

import CanvasRenderer from "./CanvasRenderer";
import LegendPanel from "./LegendPanel";

const colorMap = new Map([
    [' ', [255, 255, 255, 255]], // empty space
    ['+', [100, 100, 100, 255]], // corpse
    ['*', [100, 200, 100, 255]], // reproduces
    ['x', [200, 100, 100, 255]], // attacks
    ['o', [200, 200, 100, 255]], // photosynthesys
    ['@', [200, 100, 200, 255]], // defiles
    ['.', [100, 200, 200, 255]], // weird
]);

const typeNames = new Map([
    [' ', 'empty space'],
    ['+', 'corpse'],
    ['*', 'reproduces'],
    ['x', 'attacks'],
    ['o', 'photosynthesis'],
    ['@', 'defiles'],
    ['.', 'weirdo'],
]);


function ControlPanel(props) {
    return (
        <div>
            <CanvasRenderer colorMap={ colorMap }/>
            <LegendPanel colorMap={ Array.from(colorMap) } typeNames={ typeNames }/>
        </div>
    );
}

export default ControlPanel;