import React from 'react';
import ReactDOM from 'react-dom';
import CanvasRenderer from './CanvasRenderer';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CanvasRenderer />, div);
    ReactDOM.unmountComponentAtNode(div);
});