import React, { useEffect, useState } from "react";
import CellDNARenderer from "./CellDNARenderer";

function reload(x, y, setPayload, setLoading) {
    fetch('/entity/' + x + '/' + y)
        .then(response => {
            return response.json();
        })
        .then(payload => {
            // TODO: what to do if there is no cell?
            if (payload) {
                setPayload(payload);
            }
        })
        .catch(function (error) {
            console.log('Error: >>>', error);
        })
        .finally(() => {
            setTimeout(() => setLoading(false), 1000)
        });
}

export default function CellViewController(props) {
    const {x, y} = props.coords;

    const [payload, setPayload] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!loading) {
            setLoading(true);
            reload(x, y, setPayload, setLoading);
        }
    });

    return (
        <CellDNARenderer payload={payload}/>
    );
}