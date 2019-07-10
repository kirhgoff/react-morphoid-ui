import React, {useState} from 'react';

import WorldViewRenderer from "./WorldView/WorldViewRenderer";
import CellViewController from "./CellView/CellViewController";

import ReproduceAttacksPhotoRGB from './Palettes/ReproduceAttacksPhotoRGB'
import ReproduceAttackPhotoRGBLegend from "./Palettes/ReproduceAttackPhotoRGBLegend";
import MaxKnownDNA from "./Palettes/MaxKnownDNA";
import MaxKnownDNALegend from "./Palettes/MaxKnownDNALegend";
import PausePlay from "./WorldControls/PausePlay";
// import HealthIsBrightness from "./Palettes/HealthIsBrightness";
// import HealthIsBrightnessLegend from "./Palettes/HealthIsBrightnessLegend";

const CELL_SIZE_IN_PIXELS = 10;

export default function ControlPanel(props) {
    const [coords, setCoords] = useState({x: 0, y: 0});
    //const [palette, setPalette] = useState(MaxKnownDNA);
    const {payload} = props;

    return (
        <div>
            <h1>Oh, brave new world!</h1>
            <div>
               EARLY ACCESS: This server runs simulation of life.
               Every cell of that field has its own DNA, which is like
               Turing machine - a set of 64 instructions to do basic
               actions on the field:
               turn, move, attack, reproduce (parthenogenesis).
               Each birth has a probability to mutate one gene
               and change it to
               some random number below 64, which is
               simply a jump instruction to go to other gene.
               Below is me tinkering with control panel to
               play with the server. I am playing with it to learn
               awesome programming language
               &nbsp;<a href="https://github.com/kirhgoff/rust-morhoid">Rust</a> and
               new modern ways of building frontend using
               &nbsp;<a href="https://github.com/kirhgoff/react-morphoid-ui">React</a>.
            </div>

            <div className="main-view">
                <div>
                    <WorldViewRenderer
                        coords={ coords }
                        payload={ payload }
                        paletteProvider={ ReproduceAttacksPhotoRGB }
                        cellWidth={ CELL_SIZE_IN_PIXELS }
                        cellHeight={ CELL_SIZE_IN_PIXELS }
                        clickHandler={ coords => setCoords(coords) }
                    />
                    <ReproduceAttackPhotoRGBLegend/>
                </div>
                <div>
                    <WorldViewRenderer
                        coords={ coords }
                        payload={ payload }
                        paletteProvider={ MaxKnownDNA }
                        cellWidth={ CELL_SIZE_IN_PIXELS }
                        cellHeight={ CELL_SIZE_IN_PIXELS }
                        clickHandler={ coords => setCoords(coords) }
                    />
                    <MaxKnownDNALegend/>
                </div>

                <div>
                    <CellViewController coords={coords}/>
                </div>
                {/*<div>*/}
                {/*    <PausePlay clickHandler={(action) => console.log(action)}/>*/}
                {/*    <WorldSettingsReset/>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}
    //<div className="in-a-row">
    //                     <WorldView payload={ payload } paletteProvider={ HealthIsBrightness }/>
    //                     <HealthIsBrightnessLegend/>
    //                 </div>
    //                    <div className="in-a-row">
    //                         <WorldView payload={ payload } paletteProvider={ MaxKnownDNA }/>
    //                         <MaxKnownDNALegend/>
    //                     </div>

