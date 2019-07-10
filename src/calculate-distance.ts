import * as R from 'ramda'

/**
 * Calculates distance (aka dissmilarity) between two categorical vectors. They must have the same length
 * @param vectorA
 * @param vectorB
 */
export const calculateDistance = (vectorA : string[], vectorB : string[]) : number => {
    if (vectorA.length != vectorB.length) throw Error('Vectors must have the same length');
    return R.zip(vectorA, vectorB).reduce((res, val) => val[0] === val[1] ? res : res + 1, 0)
};
