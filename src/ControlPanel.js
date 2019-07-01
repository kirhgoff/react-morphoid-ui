import React from 'react';

import WorldView from "./WorldView";
import ReproduceAttacksPhotoRGB from './Palettes/ReproduceAttacksPhotoRGB'
import ReproduceAttackPhotoRGBLegend from "./Palettes/ReproduceAttackPhotoRGBLegend";
import CellViewer from "./CellViewer";

// import MaxKnownDNA from "./Palettes/MaxKnownDNA";
 import MaxKnownDNALegend from "./Palettes/MaxKnownDNALegend";
// import HealthIsBrightness from "./Palettes/HealthIsBrightness";
// import HealthIsBrightnessLegend from "./Palettes/HealthIsBrightnessLegend";

export default function ControlPanel(props) {
    const {payload} = props;
    return (
        <div>
            <h1>Oh, brave new world!</h1>
            <div>
                <div className="in-a-row">
                    <div className="in-a-row">
                        <WorldView payload={payload} paletteProvider={ReproduceAttacksPhotoRGB}/>
                        <ReproduceAttackPhotoRGBLegend/>
                        <MaxKnownDNALegend/>
                    </div>
                </div>
                <div className="in-a-row">
                    <CellViewer x={5} y={6}/>
                </div>
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

    //                <div>
    //                     2EARLY ACCESS: This server runs simulation of life.
    //                     Every cell of that field has its own DNA, which is like
    //                     Turing machine - a set of 64 instructions to do basic
    //                     actions on the field:
    //                     turn, move, attack, reproduce (parthenogenesis).
    //                     Each birth has a probability to mutate one gene
    //                     and change it to
    //                     some random number below 64, which is
    //                     simply a jump instruction to go to other gene.
    //                     Below is me tinkering with control panel to
    //                     play with the server. I am playing with it to learn
    //                     awesome programming language
    //                     &nbsp;<a href="https://github.com/kirhgoff/rust-morhoid">Rust</a> and
    //                     new modern ways of building frontend using
    //                     &nbsp;<a href="https://github.com/kirhgoff/react-morphoid-ui">React</a>.
    //                 </div>
