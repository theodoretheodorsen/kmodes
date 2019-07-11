import {CategoricalVector} from "./models";
import {initRandomly} from "./init-modes";
import {getClosestMode} from "./calculate-distance";
import * as R from 'ramda';
import {calculateModeVector} from "./calculate-mode-vector";
import {costFunction} from "./cost-function";


export const kmodes = (vectors: CategoricalVector[], nbClusters: number, limit: number): CategoricalVector[] => {
    let initModes = initRandomly(vectors, nbClusters);
    return kmodesIteration(vectors, nbClusters, initModes, null, limit);
};

const kmodesIteration = (vectors: CategoricalVector[], nbClusters: number, modes: CategoricalVector[],
                         iteration: number = 0, limit: number = 10): CategoricalVector[] => {
    if (iteration >= limit) return modes;
    let modesDistances = vectors.map(v => getClosestMode(v, modes));
    console.log(`Iteration ${iteration}: cost of ${costFunction(modesDistances)}`);
    let grouped = R.groupBy(modeDistance => modeDistance.mode.toString(), modesDistances);
    let newModes = Object.keys(grouped).map(key => grouped[key])
        .map(distances => calculateModeVector(distances.map(d => d.vector)));
    return kmodesIteration(vectors, nbClusters, newModes, iteration + 1, limit);
};

