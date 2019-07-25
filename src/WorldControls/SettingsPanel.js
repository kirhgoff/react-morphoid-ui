import React, { useState, useEffect } from 'react';

function updateSettings(settings) {
    fetch('/world/settings/update', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings)
    })
    .catch(error => console.log('>>>> Error:', error))
    .finally(() => console.log("updated settings..."));
}

function getSettings(handler) {
    fetch('/world/settings/get')
    .then(response => response.json())
    .then(payload => {console.log("Payload:", payload); handler(payload)})
    .catch(error => console.log('>>>> Error:', error))
    .finally(() => console.log("got settings..."));
}

function resetWorld() {
    fetch('/world/reset', {
        method: 'post'
    })
    .catch(error => console.log('>>>> Error:', error))
    .finally(() => console.log("reset world..."));
}

const SLIDERS = [
    ["reproduce_cost", {min: -1000, max: 0, desc: "Reproduce cost"}],
    ["attack_cost", {min: -1000, max: 0, desc: "Attack cost"}],
    ["move_cost", {min: -1000, max: 0, desc: "Move cost"}],
    ["turn_cost", {min: -1000, max: 0, desc: "Turn cost"}],
    ["sense_cost", {min: -1000, max: 0, desc: "Sense cost"}],
    ["defile_cost", {min: -1000, max: 0, desc: "Defile cost"}],
    ["corpse_initial", {min: 0, max: 1000, desc: "Initial corpse energy"}],
    ["initial_cell_health", {min: 0, max: 1000, desc: "Initial cell health"}],
    ["photosynthesis_adds", {min: 0, max: 1000, desc: "Photosynthesis adds per cycle"}],
    ["attack_damage", {min: 0, max: 1000, desc: "Attack damage"}],
    ["defile_damage", {min: 0, max: 1000, desc: "Corpse consume gain per bite"}],
    ["corpse_decay", {min: -1000, max: 0, desc: "Corpse energy dissipation"}],
    ["mutation_probability", {min: 0, max: 100, desc: "Mutation probability", scale: 0.01}],
];

function SettingValueSlider({ settings, setSettings, slider_name, slider_info }) {
    const scale = slider_info.scale ? slider_info.scale : 1;
    const currentValue = settings[slider_name] / scale;

    return (
        <div id={slider_name} className="slider">
            <div className="slider-desc">{slider_info.desc}</div>
            <input
                   type="range"
                   min={slider_info.min}
                   max={slider_info.max}
                   step="1"
                   value={currentValue}
                   onChange={event => {
                       const value = event.target.value * scale;
                       setSettings(settings => {
                           return { ...settings, [slider_name]: Number(value) };
                       })
                   }}
            />
            <div>{settings[slider_name]}</div>
        </div>
    );
}

export default function SettingsPanel() {
    const [settings, setSettings] = useState(null);
    useEffect(() => { getSettings(setSettings) },[]);

    if (settings) {
        return (
            <div>
                <h3 className="settings-header">World conditions: be careful</h3>
                <div className="slider-group">
                    {SLIDERS.map((info) => {
                        const slider_name = info[0];
                        const slider_info = info[1];
                        return <SettingValueSlider
                            key={slider_name}
                            // Javascript magic
                            {...{ settings, setSettings, slider_name, slider_info }}
                        />
                    })}
                </div>
                <div className="button-set">
                    <div onClick={() => updateSettings(settings)} className="button">Update settings</div>
                    <div onClick={() => getSettings(setSettings)} className="button">Load settings</div>
                    <div onClick={() => resetWorld()} className="button">Reset world</div>
                </div>
            </div>
        );
    } else {
        // TODO: add loading style
        return (<div>Loading...</div>);
    }
}
