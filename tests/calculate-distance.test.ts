import {calculateDistance, getClosestMode} from "../src/calculate-distance";

describe('calculate distance', () => {
    test('of equal vectors', () => {
        expect(calculateDistance(['a', 'b', 'c'], ['a', 'b', 'c'])).toBe(0);
    });

    test('of different vectors', () => {
        expect(calculateDistance(['a', 'd', 'x'], ['a', 'b', 'c'])).toBe(2);
    });

    test('of vectors with different size', () => {
        expect(() => calculateDistance(['a', 'd'], ['a', 'b', 'c'])).toThrow('Vectors must have the same length');
    });
});

describe('closest mode', () => {
    test('of a mode', () => {
        let vector = ['a', 'b', 'c'];
        expect(getClosestMode(
            vector
            , [
                ['a', 'b', 'c'],
                ['a', 'b', 'c'],
                ['c', 'd', 'x']
            ]
        )).toStrictEqual({vector, mode : vector, distance : 0});
    });

    test('of random vectors', () => {
        let vector =  ['a', 'r', 'r'];
        let closest = ['a', 'b', 'c'];
        expect(getClosestMode(
            vector,
            [
                closest,
                ['c','d', 'x']
            ]
        )).toStrictEqual({vector, mode  : closest, distance : 2});
    });
});