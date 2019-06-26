import React from "react";

export default function ReproduceAttackPhotoRGBLegend() {
    // TODO: merge it with MaxKnownDNA
    const COLOR_MAP = [
        ['attack : more red', [200, 100, 100, 255]],
        ['photosynthesis : more green', [100, 200, 100, 255]],
        ['reproduces : more blue', [100, 100, 200, 255]],
        ['defiles : downs the brightness', [0, 0, 0, 255]]
    ];

    // TODO: extract util function
    function colorFor(array) {
        return "#" + array.slice(0, 3).map((num) => num.toString(16)).join('');
    }

    return (
        <div className="legend bordered">
            <div>Types of genes mix together as r, g, b</div>
            {COLOR_MAP.map(([title, color]) => (
                <div key={title}>
                    <span className="bordered" style={{background: colorFor(color)}}/>
                    {title}
                </div>
            ))}
        </div>
    );
}