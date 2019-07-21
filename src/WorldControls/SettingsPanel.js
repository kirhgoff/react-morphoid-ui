import React, { useState, useEffect } from 'react';

function updateSettings() {
    fetch('/update_settings')
        .catch(function(error) {
            console.log('Error: >>>', error);
        });
}

function loadSettings(handler) {
    fetch('/world/settings/get')
        .then(response => {
            return response.json();
        })
        .then(payload => handler(payload))
        .catch(function(error) {
            console.log('Error: >>>', error);
        });
}

export default function SettingsPanel() {
    const [settings, setSettings] = useState({reproduce_threshold: 0});
    useEffect(() => { loadSettings(setSettings) },[]);
    return (
        <div>
            <div onClick={() => {updateSettings()}} className="bordered">Update settings</div>
            <div className="slider-group">
                <div id="slider_reproduce_threshold" className="slider">
                    <div>Reproduce threshold:</div>
                    <input type="range"
                           min="0"
                           max="200"
                           step="1"
                           value={settings.reproduce_threshold}
                           onChange={event => { setSettings({ reproduce_threshold: event.target.value })}}
                    />
                    <div>{settings.reproduce_threshold}</div>
                </div>
            </div>
        </div>
    );
}
