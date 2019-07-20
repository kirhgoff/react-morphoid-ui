import React, { useState } from 'react';
import PropTypes from "prop-types";
import WorldViewRenderer from "../WorldView/WorldViewRenderer";

function updateSettings() {
    fetch('/update_settings')
        .catch(function(error) {
            console.log('Error: >>>', error);
        });
}

export default function UpdateSettingsButton() {
    return (
        <div
            onClick={() => {updateSettings()}}
            className="bordered">Update settings</div>
    );
}
