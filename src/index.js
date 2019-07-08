import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import './index.html';

import WorldViewController from "./WorldView/WorldViewController";

console.log("Started-------");
ReactDOM.render(
    <WorldViewController />,
    document.getElementById('root')
);
