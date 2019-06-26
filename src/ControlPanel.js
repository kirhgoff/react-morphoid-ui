import React from 'react';

import WorldView from "./WorldView";

export default function ControlPanel(props) {
    const { payload } = props;
    return (
        <div>
            <WorldView payload={ payload }/>
        </div>
    );
}
