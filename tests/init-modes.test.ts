import {initRandomly} from "../src/init-modes";


describe('init randomly', () => {
    test('of only three vectors and three modes', () => {
        let vectors = [
            ['a', 'b', 'c'],
            ['a', 'n', 'c'],
            ['c', 'b', 'c']
        ];
        let initRandomlyArr = initRandomly(vectors, 3);
        vectors.forEach(v => {
            expect(initRandomlyArr).toContain(v)
        })
    });

    test('five vectors and two modes', () => {
        let vectors = [
            ['a', 'b', 'c'],
            ['a', 'n', 'c'],
            ['c', 'b', 'c'],
            ['x','l', 'k'],
            ['q','q','q']
        ];
        let initRandomlyArr = initRandomly(vectors, 2);
        expect(initRandomlyArr.length).toBe(2);
        initRandomlyArr.forEach(v => {
            expect(vectors).toContain(v)
        })
    })
});