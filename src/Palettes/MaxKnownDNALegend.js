import React from 'react';

export default function MaxKnownDNALegend() {
    // TODO: merge it with MaxKnownDNA
    const COLOR_MAP = [
        ['empty space', [255, 255, 255, 255]], // empty space
        ['corpse', [100, 100, 100, 255]], // corpse
        ['reproduces', [100, 200, 100, 255]], // reproduces
        ['attacks', [200, 100, 100, 255]], // attacks
        ['photosynthesis', [200, 200, 100, 255]], // photosynthesis
        ['defiles', [200, 100, 200, 255]], // defiles
        ['weirdo', [100, 200, 200, 255]], // weird
    ];

    function colorFor(array) {
        return "#" + array.slice(0, 3).map((num) => num.toString(16)).join('');
    }

    return (
        <div className="legend bordered">
            <div>Cells having more genes of specific type has different colors</div>
            {COLOR_MAP.map(([title, color]) => (
                <div key={title}>
                    <span className="bordered" style={{background: colorFor(color)}}/>
                     {title}
                </div>
            ))}
        </div>
    );
}