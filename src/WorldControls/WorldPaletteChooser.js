import React, { useState } from 'react';
import PropTypes from "prop-types";
import WorldViewRenderer from "../WorldView/WorldViewRenderer";

export default function WorldPaletteChooser(props) {
    const { palettes, initial } = props;

    return (
        <div className="palette-chooser">
            {palettes.map(([title, obj]) => (
                <div className={{"bordered": title === initial}} key={title} onClick={(_) => {
                    props.selectHandler(obj)
                }}>{title}</div>
            ))}
        </div>
    );
}

WorldPaletteChooser.propTypes = {
    initial: PropTypes.string.isRequired,
    palettes: PropTypes.arrayOf(PropTypes.any),
    selectHandler: PropTypes.func.isRequired
};
