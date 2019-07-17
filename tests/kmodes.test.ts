import {runKmodes} from "../src/runKmodes";

describe('run runKmodes', () => {
    test('of random vectors', () => {
        expect(runKmodes(
            [['a', 'x', 'c', 'c', 'c','b'], ['a', 'b', 'k', 'r', 'c','b'], ['a', 'b', 'c', 'c', 'd','a']],
            1,
            3
            ).clusters[0].mode
        ).toStrictEqual(['a', 'b','c', 'c', 'c', 'b']);
    });
    test('of random vectors bis', () => {
        let modes =  runKmodes(
            [
                ['a', 'b', 'c'],
                ['x','z','ee'],
                ['a', 'c', 'e'],
                ['p','z','w'],
                ['a', 'd', 'f'],
                ['x','rr','x']
            ],
            2,
            3
        ).clusters.map(cl => cl.mode);
        expect(modes).toContainEqual(['a', 'b', 'c']);
        expect(modes).toContainEqual(['x', 'z','ee']);
    });
});