import React, { useEffect, useState } from "react";
import CellDNARenderer from "./CellDNARenderer";

export default function CellViewController(props) {
    console.log("Props:", props);

    function reload(setPayload) {
        const { coords } = props;

        fetch('/entity/' + coords.x + '/' + coords.y)
            .then(response => {
                return response.json();
            })
            .then(payload => {
                console.log("Payload: ", payload);
                // TODO: what to do if there is no cell?
                if (payload) {
                    setPayload(payload);
                }
                //setTimeout( () => {this.reload()},1000);
            })
            .catch(function (error) {
                console.log('Error: >>>', error);
            });
    }

    const [payload, setPayload] = useState(null);

    useEffect(() => {
        const timer = setInterval( () => {reload(setPayload)},1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <CellDNARenderer payload={payload}/>
    );
}