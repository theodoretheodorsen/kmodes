import * as R from 'ramda'
import {CategoricalVector, Cluster} from "./models";
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
 * For a given vector get the cluster with closest mode
 * @param vector
 * @param clusters
 * @param processingFunction
 */
export const getClusterWithClosestMode = (vector : CategoricalVector, clusters : Cluster[],
                                          processingFunction : (line : string[]) => string[] = (line : string[]) => line) : Cluster => {
    return shuffle(clusters).reduce((res, cluster) => {
        let processedVector = processingFunction(vector);
        let distanceToClusterOfIteration = calculateDistance(processedVector, processingFunction(cluster.mode));
        if (distanceToClusterOfIteration === 0) return cluster;
        let distanceToPrevious = calculateDistance(processedVector, processingFunction(res.mode));
        return distanceToPrevious > distanceToClusterOfIteration ? cluster : res
    })
};

function shuffle(array: any[]): any[] {
    const oldArray = [...array];
    let newArray : any[] = [];
    while (oldArray.length) {
        newArray = newArray.concat(oldArray.splice(Math.floor(Math.random() * oldArray.length), 1));
    }
    return newArray;
}