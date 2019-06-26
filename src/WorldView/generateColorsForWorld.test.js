import React from 'react';
import { shallow } from 'enzyme';
import Index from './index';

describe('Index component', () => {
    const fieldWidth = 3;
    const imageWidth = 30;
    const cellWidth = 10;
    const cellHeight = 10;

    it('give correct next index', () => {
        const initialData = {};

        const renderer = shallow(<Index payload={ initialData }/>);
        const imageDataIndex = 0;
        const inputDataIndex = 0;

        const nextCellIndex = renderer.moveToNextCell(
            imageDataIndex,
            inputDataIndex,
            fieldWidth,
            imageWidth,
            cellWidth,
            cellHeight
        );

        expect(nextCellIndex).toEqual(40);
    });
});