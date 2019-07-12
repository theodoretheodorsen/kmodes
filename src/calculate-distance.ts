import * as R from 'ramda'
import {CategoricalVector, ModeDistance, Cluster} from "./models";

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
 */
export const getClusterWithClosestMode = (vector : CategoricalVector, clusters : Cluster[]) : Cluster => {
    return clusters.reduce((res, cluster) => {
        let distanceToClusterOfIteration = calculateDistance(vector, cluster.mode);
        if (distanceToClusterOfIteration === 0) return cluster;
        let distanceToPrevious = calculateDistance(vector, res.mode);
        return distanceToPrevious > distanceToClusterOfIteration ? cluster : res
    })
};