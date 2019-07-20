import React, {useState} from 'react';

import WorldViewRenderer from "../WorldView/WorldViewRenderer";
import CellViewController from "../CellView/CellViewController";

import ReproduceAttacksPhotoRGB from '../Palettes/ReproduceAttacksPhotoRGB'
import ReproduceAttackPhotoRGBLegend from "../Palettes/ReproduceAttackPhotoRGBLegend";
import MaxKnownDNA from "../Palettes/MaxKnownDNA";
import MaxKnownDNALegend from "../Palettes/MaxKnownDNALegend";
import HealthIsBrightness from "../Palettes/HealthIsBrightness";
import HealthIsBrightnessLegend from "../Palettes/HealthIsBrightnessLegend";

import UpdateSettingsButton from "./UpdateSettingsButton";
import WorldPaletteChooser from "./WorldPaletteChooser";

const CELL_SIZE_IN_PIXELS = 10;
// TODO: fix redundant key
const PALETTES = [
    ["max known dna", {label: "max known dna", provider: MaxKnownDNA, legend: MaxKnownDNALegend}],
    ["rgb as reproduce, attack, photo", {label: "rgb as reproduce, attack, photo", provider: ReproduceAttacksPhotoRGB, legend: ReproduceAttackPhotoRGBLegend}],
    ["health is brightness", {label: "health is brightness", provider: HealthIsBrightness, legend: HealthIsBrightnessLegend}]
];

export default function ControlPanel(props) {
    const [coords, setCoords] = useState({x: 0, y: 0});
    const [palette, setPalette] = useState(PALETTES[0][1]);
    const {payload} = props;

    const LegendTagName = palette.legend;

    return (
        <div>
            <WorldPaletteChooser palettes={PALETTES} selected={palette.label} selectHandler={setPalette}/>
            <div className="main-view">
                <div>
                    <WorldViewRenderer
                        coords={coords}
                        payload={payload}
                        paletteProvider={palette.provider}
                        cellWidth={CELL_SIZE_IN_PIXELS}
                        cellHeight={CELL_SIZE_IN_PIXELS}
                        clickHandler={coords => setCoords(coords)}
                    />
                    <LegendTagName/>
                </div>
                <div>
                    <UpdateSettingsButton/>
                </div>
                <div>
                    <CellViewController coords={coords}/>
                </div>
            </div>
        </div>
    );
}
