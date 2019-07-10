import {CategoricalVector} from "./models";

export const calculateModeVector = (vectors : CategoricalVector[]) : CategoricalVector => {
    let vectorLength = vectors[0].length;
    let i : number;
    let transpose : string[][] = [];
    for (i = 0; i < vectorLength; i++) {
        transpose = [...transpose, vectors.map(v => v[i])]
    }
    return transpose.map(v => calculateMode(v))
};

const calculateMode = (vector : string[]) : string => {
    //TODO
    return '';
}