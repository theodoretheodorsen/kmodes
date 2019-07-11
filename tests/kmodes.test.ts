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
});