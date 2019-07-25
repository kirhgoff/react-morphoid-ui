import React from 'react';

// const GENE_COMPLEXITY = new Map([
//     [26, ["if nothing", "if cell", "if corpse"]],
//     [27, ["turn to"]],
// ]);

const KNOWN_GENES=new Map([
    [25, "defile"],
    [26, "sense"],
    [27, "turn"],
    [28, "move"],
    [29, "attack"],
    [30, "reproduce"],
    [31, "photosynthesis"]
]);

function description(gene) {
    const value = KNOWN_GENES.get(gene);
    if (value !== undefined) {
        return value
    } else {
        return ""
    }
}

function GeneView(props) {
    const {index, gene} = props;
    const desc = description(gene);
    const text = desc ? desc : gene;
    return (
        <div>
            <div className="index">{index}</div>
            <div className={"value " + desc}>{text}</div>
        </div>
    );
}

export default function CellDNARenderer(props) {
    if (props.payload) {
        const {
            x, y, health, direction, genome_id, genome
        } = props.payload;

        return (
            <div>

                <div className="cell-info">
                    <h3>Cell # { genome_id }</h3>
                    <div>x: { x }</div>
                    <div>y: { y }</div>
                    <div>health: { health }</div>
                    <div>direction: { direction }</div>
                    <div>&nbsp;</div>
                </div>

                <div className="genome no-discs">
                    {genome.map((gene, index) => {
                        // TODO: use queue to pass values to next GeneView
                        //  if it is a sense or move or turn
                        return <GeneView key={index} index={index} gene={gene}/>;
                    })}
                </div>
            </div>
        );
    } else {
        return <div>No cell here...</div>
    }
}