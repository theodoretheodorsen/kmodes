import {kmodes} from "../src/kmodes";

describe('run kmodes', () => {
    test('of random vectors', () => {
        expect(kmodes(
            [['a', 'x', 'c', 'c', 'c','b'], ['a', 'b', 'k', 'r', 'c','b'], ['a', 'b', 'c', 'c', 'd','a']],
            1,
            3
            )
        ).toStrictEqual([['a', 'b','c', 'c', 'c', 'b']]);
    });
    test('of random vectors bis', () => {
        let modes =  kmodes(
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
        );
        expect(modes).toContainEqual(['a', 'b', 'c']);
        expect(modes).toContainEqual(['x', 'z','ee']);
    });
});