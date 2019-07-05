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

export default function CellDNARenderer(props) {
    function description(gene) {
        const value = KNOWN_GENES.get(gene);
        if (value !== undefined) {
            return value
        } else {
            return ""
        }
    }

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
                    <li>genome:
                        <ul className="genome no-discs">
                            {genome.map((gene, index) => (
                                <li className="bordered" key={index}>
                                    <div className="index">{index}</div>
                                    <div className={"value " + description(gene)}>{description(gene) ? description(gene) : gene}</div>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </div>
        );
    } else {
        return <div>Fetching....</div>
    }
}