import {costFunction} from "../src/cost-function";
import {calculateMode, calculateModeVector} from "../src/calculate-mode-vector";


describe('calculate mode', () => {
    test('of random vector', () => {
        expect(calculateMode(['a', 'b', 'c', 'c', 'c','b'])
        ).toBe('c');
    });
    test('of vector with amgibuous mode', () => {
        expect(calculateMode(['a', 'b', 'c', 'c','b'])
        ).toBe('b');
    });
});

describe('calculate mode vector', () => {
    test('of random vectors', () => {
        expect(calculateModeVector([['a', 'x', 'c', 'c', 'c','b'], ['a', 'b', 'k', 'r', 'c','b'], ['a', 'b', 'c', 'c', 'd','a']])
        ).toStrictEqual(['a', 'b','c', 'c', 'c', 'b']);
    });
});