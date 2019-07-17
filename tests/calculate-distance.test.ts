import {calculateDistance, getClusterWithClosestMode} from "../src/calculate-distance";

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

describe('closest cluster', () => {
    test('of a mode', () => {
        let vector = ['a', 'b', 'c'];
        let clusterA = {mode: ['a', 'b', 'c'], vectors: [['a', 'b', 'c'], ['a', 'b', 'c']], number : 0};
        let clusterB = {mode: ['c', 'd', 'x'], vectors: [['c', 'd', 'x']], number : 1};
        let clusters = [clusterA, clusterB];
        expect(getClusterWithClosestMode(vector, clusters)).toStrictEqual(clusterA);
    });

    test('of random vectors', () => {
        let vector =  ['a', 'r', 'r'];
        let clusterA = {mode: ['a', 'b', 'c'], vectors: [['a', 'b', 'c'], ['a', 'b', 'c']], number : 0};
        let clusterB = {mode: ['c', 'd', 'x'], vectors: [['c', 'd', 'x']], number : 1};
        expect(getClusterWithClosestMode(vector,[clusterA, clusterB])).toStrictEqual(clusterA);
    });
});