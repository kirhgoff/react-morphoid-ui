import React, { useState } from "react";
import CellDNARenderer from "./CellDNARenderer";

export default function CellViewer(props) {
    const [payload, setPayload] = useState(null);

    const x = props.coords.x;
    const y = props.coords.y;

    if (payload === null || x !== payload.x || y !== payload.y) {
        fetch('/entity/' + x + '/' + y)
            .then(response => {
                return response.json();
            })
            .then(payload => setPayload(payload))
            .catch(function (error) {
                console.log('Error: >>>', error);
            });
    }

    return (
        <CellDNARenderer payload={payload}/>
    );
}