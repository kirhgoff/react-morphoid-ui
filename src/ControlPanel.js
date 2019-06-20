import React from 'react';

import CanvasRenderer from "./CanvasRenderer";

export default function ControlPanel(props) {
    const { payload } = props;
    return (
        <div>
            <CanvasRenderer payload={ payload }/>
        </div>
    );
}
