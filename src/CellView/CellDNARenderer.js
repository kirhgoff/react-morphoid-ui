import React from 'react';

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
    const label = desc ? desc : gene;
    return (
        <li className="bordered">
            <div className="index">{index}</div>
            <div className={"value " + desc}>{label}</div>
        </li>
    );
}

export default function CellDNARenderer(props) {
    if (props.payload) {
        const {
            x, y, health, direction, genome_id, genome
        } = props.payload;

        return (
            <div>
                <h3>Cell # { genome_id }</h3>
                <ul>
                    <li>x: { x }</li>
                    <li>y: { y }</li>
                    <li>health: { health }</li>
                    <li>direction: { direction }</li>
                </ul>

                <ul className="genome no-discs">
                    {genome.map((gene, index) => {
                        // TODO: use queue to pass values to next GeneView
                        //  if it is a sense or move or turn
                        return <GeneView  key={index} index={index} gene={gene}/>;
                    })}
                </ul>
            </div>
        );
    } else {
        return <div>Fetching....</div>
    }
}