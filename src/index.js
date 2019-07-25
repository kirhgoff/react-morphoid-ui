import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import './index.html';

import WorldViewController from "./WorldView/WorldViewController";

function morphoidEarlyAccessDescription() {
    return <div>
        EARLY ACCESS: This server runs simulation of life.
        Every cell of that field has its own DNA, which is like
        Turing machine - a set of 64 instructions to do basic
        actions on the field:
        turn, move, attack, reproduce (parthenogenesis).
        Each birth has a probability to mutate one gene
        and change it to
        some random number below 64, which is
        simply a jump instruction to go to other gene.
        Below is me tinkering with control panel to
        play with the server. I am playing with it to learn
        awesome programming language
        &nbsp;<a href="https://github.com/kirhgoff/rust-morhoid">Rust</a> and
        new modern ways of building frontend using
        &nbsp;<a href="https://github.com/kirhgoff/react-morphoid-ui">React</a>.
    </div>;
}

console.log("Starting Morphoid UI");
console.log("====================");
ReactDOM.render(
    <div>
        <h1>Oh, brave new world!</h1>
        <hr/>
        <WorldViewController />
        <hr/>
        {morphoidEarlyAccessDescription()}
    </div>,
    document.getElementById('root')
);
