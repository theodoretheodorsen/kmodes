import * as R from 'ramda'
import {CategoricalVector, ModeDistance} from "./models";

/**
 * Calculates distance (aka dissmilarity) between two categorical vectors. They must have the same length
 * @param vectorA
 * @param vectorB
 */
export const calculateDistance = (vectorA : CategoricalVector, vectorB : CategoricalVector) : number => {
    if (vectorA.length != vectorB.length) throw Error('Vectors must have the same length');
    return R.zip(vectorA, vectorB).reduce((res, val) => val[0] === val[1] ? res : res + 1, 0)
};


/**
 * For a given vector get the closest mode
 * @param vector
 * @param modes
 */
export const getClosestMode = (vector : CategoricalVector, modes : CategoricalVector[]) : ModeDistance => {
    return modes.reduce((res, mode) => {
        if (res.distance === 0) return res;
        let distance = calculateDistance(mode, vector);
        return res.distance < distance ? res : {mode, distance, vector};
    }, {mode : null, distance : Number.MAX_VALUE, vector})
};