import React, { useState, useEffect } from 'react';

function updateSettings(settings) {
    fetch('/world/settings/update', {
        method: 'post',
        body: JSON.stringify(settings)
    })
    .catch(error => console.log('Error: >>>', error))
    .finally(() => console.log("updated settings..."));
}

function getSettings(handler) {
    fetch('/world/settings/get')
    .then(response => response.json())
    .then(payload => handler(payload))
    .catch(error => console.log('Error: >>>', error))
    .finally(() => console.log("got settings..."));
}

const SLIDERS = [
    ["reproduce_cost", {min: -100, max: 0, desc: "Reproduce cost"}],
    ["reproduce_threshold", {min: 0, max: 100, desc: "Reproduce threshold"}],
];

function SettingValueSlider({ settings, setSettings, slider_name, slider_info }) {
    const key = "slider_" + slider_name;
    return (
        <div id={key} className="slider">
            <div>{slider_info.desc}</div>
            <input
                   type="range"
                   min={slider_info.min}
                   max={slider_info.max}
                   step="1"
                   value={settings[slider_name]}
                   onChange={event => {
                       const value = event.target.value;
                       setSettings(settings => {
                           return { ...settings, [slider_name]: value };
                       })
                   }}
                   //  onChange={event => {
                   //      settings[slider_name] = event.target.value;
                   //      setSettings(prev => {
                   //          settings
                   //      })
                   //  }}

            />
            <div>{settings[slider_name]}</div>
        </div>
    );
}

export default function SettingsPanel() {
    const [settings, setSettings] = useState(null); // TODO: can I use null?
    useEffect(() => { getSettings(setSettings) },[]);

    if (settings) {
        console.log("settings: ", settings);
        return (
            <div>
                <div onClick={() => {
                    updateSettings(settings)
                }} className="bordered">Update settings
                </div>
                <div className="slider-group">
                    {SLIDERS.map((info) => {
                        return <SettingValueSlider key={info[0]} {...{ settings, setSettings, slider_name: info[0], slider_info: info[1] }} />
                    })}
                </div>
            </div>
        );
    } else {
        console.log("not yet: ");
        return (<div>Loading...</div>);
    }
}
