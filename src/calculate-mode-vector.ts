import {CategoricalVector, identity, ProcessingFunction} from "./models";
import * as R from 'ramda';

export const calculateModeVector = (vectors : CategoricalVector[], processingFunction : ProcessingFunction = identity) : CategoricalVector => {
    let vectorLength = processingFunction(vectors[0]).length;
    let i : number;
    let transpose : string[][] = [];
    for (i = 0; i < vectorLength; i++) {
        transpose = [...transpose, vectors.map(v => processingFunction(v)).map(v => v[i])]
    }
    return transpose.map(v => calculateMode(v))
};

export const calculateMode = (vector: string[]): string => {
    return vector.reduce((cum, item) => {
        let current = R.find(i => i.value === item, cum);
        if (current == null) return [...cum, {value: item, counter: 1}];
        let index = cum.indexOf(current);
        cum[index].counter = cum[index].counter + 1;
        return cum;
    }, []).sort((a, b) => b.counter - a.counter)[0].value;
};