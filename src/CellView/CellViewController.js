import React, { useState } from "react";
import CellDNARenderer from "./CellDNARenderer";

export default function CellViewController(props) {
    function reload() {
        fetch('/entity/' + x + '/' + y)
            .then(response => {
                return response.json();
            })
            .then(payload => {
                setPayload(payload);
            })
            .catch(function (error) {
                console.log('Error: >>>', error);
            });
    }

    const [payload, setPayload] = useState(null);

    const x = props.coords.x;
    const y = props.coords.y;

    if (payload === null || x !== payload.x || y !== payload.y) {
        reload();
    } else {
        setTimeout(() => {reload()},1000)
    }

    return (
        <CellDNARenderer payload={payload}/>
    );
}