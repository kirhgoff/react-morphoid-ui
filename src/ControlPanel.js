import React from 'react';

import WorldView from "./WorldView";
import ReproduceAttacksPhotoRGB from './Palettes/ReproduceAttacksPhotoRGB'
import MaxKnownDNA from "./Palettes/MaxKnownDNA";
import MaxKnownDNALegend from "./Palettes/MaxKnownDNALegend";
import HealthIsBrightness from "./Palettes/HealthIsBrightness";
import ReproduceAttackPhotoRGBLegend from "./Palettes/ReproduceAttackPhotoRGBLegend";
import HealthIsBrightnessLegend from "./Palettes/HealthIsBrightnessLegend";

export default function ControlPanel(props) {
    const { payload } = props;
    return (
        <div>
            <h1>Oh, brave new world!</h1>
            <div>
                <div className="in-a-row">
                    <WorldView payload={ payload } paletteProvider={ ReproduceAttacksPhotoRGB }/>
                    <ReproduceAttackPhotoRGBLegend/>
                </div>
                <div className="in-a-row">
                    <WorldView payload={ payload } paletteProvider={ MaxKnownDNA }/>
                    <MaxKnownDNALegend/>
                </div>
                <div className="in-a-row">
                    <WorldView payload={ payload } paletteProvider={ HealthIsBrightness }/>
                    <HealthIsBrightnessLegend/>
                </div>
            </div>
        </div>
    );
}
