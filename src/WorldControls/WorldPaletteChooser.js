import React, { useState } from 'react';
import PropTypes from "prop-types";
import WorldViewRenderer from "../WorldView/WorldViewRenderer";

export default function WorldPaletteChooser(props) {
    const { palettes, selected } = props;

    return (
        <div className="palette-chooser">
            {palettes.map(([title, obj]) => (
                <div
                    key={title}
                    onClick={() => { props.selectHandler(obj) }}
                    className={title === selected ? "selected" : "not-selected"}
                >
                    {title === selected ? '[' + title + ']' :  ' ' + title + ' ' }
                </div>
            ))}
        </div>
    );
}

WorldPaletteChooser.propTypes = {
    selected: PropTypes.string.isRequired,
    palettes: PropTypes.arrayOf(PropTypes.any),
    selectHandler: PropTypes.func.isRequired
};
