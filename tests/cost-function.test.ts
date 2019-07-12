import {costFunction} from "../src/cost-function";


describe('calculate cost function', () => {
    test('of single cluster', () => {
        expect(costFunction(
            [
                {mode : ['a', 'b', 'c'], vectors : [['a', 'x', 'c'], ['a', 'b', 'u'], ['r', 'b', 'c']]}
            ]
            )
        ).toBe(3);
    })
});



