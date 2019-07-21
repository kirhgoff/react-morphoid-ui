import React, { useState, useEffect } from 'react';

function updateSettings(settings) {
    fetch('/world/settings/update', {
        method: 'post',
        body: JSON.stringify(settings)
    })
    .catch(error => console.log('Error: >>>', error));
}

function getSettings(handler) {
    fetch('/world/settings/get')
    .then(response => response.json())
    .then(payload => handler(payload))
    .catch(error => console.log('Error: >>>', error));
}

export default function SettingsPanel() {
    const [settings, setSettings] = useState({reproduce_threshold: 0});
    useEffect(() => { getSettings(setSettings) },[]);
    return (
        <div>
            <div onClick={() => {updateSettings(settings)}} className="bordered">Update settings</div>
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
