import {costFunction} from "../src/cost-function";


describe('calculate cost function', () => {
    test('of random distances', () => {
        expect(costFunction(
            [
                {vector: ['a', 'b', 'c'], mode: ['a', 'n', 'c'], distance: 1},
                {vector: ['a', 'n', 'c'], mode: ['x', 'n', 'c'], distance: 1},
                {vector: ['c', 'b', 'c'], mode: ['x', 'n', 'c'], distance: 2}
            ]
            )
        ).toBe(4);
    });
});