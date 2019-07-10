import {CategoricalVector} from "./models";

export const initRandomly = (vectors : CategoricalVector[], numberOfClusters : number) : CategoricalVector[] => {
    let i : number;
    let randomArr : number[] = [];
    for (i = 0; i < numberOfClusters; i++) {
        let random = Math.floor(Math.random() * vectors.length);
        while (randomArr.indexOf(random) > -1) {
            random = Math.floor(Math.random() * vectors.length);
        }
        randomArr = [...randomArr, random]
    }
    return randomArr.map(r => vectors[r])
};