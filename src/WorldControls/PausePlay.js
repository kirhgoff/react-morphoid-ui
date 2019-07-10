import React, { useState } from 'react';
import PropTypes from "prop-types";
import WorldViewRenderer from "../WorldView/WorldViewRenderer";

export default function PausePlay(props) {
    const [action, setAction] = useState("Pause");

    return (
        <div onClick={() => {
            props.clickHandler(action);
            if (action === "Pause") {
                setAction("Play");
            } else {
                setAction("Pause");
            }
        }} className="bordered">{action}</div> // TODO: use spread operator
    );
}

WorldViewRenderer.propTypes = {
    clickHandler: PropTypes.func.isRequired
};
