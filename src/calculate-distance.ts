import * as R from 'ramda'
import {CategoricalVector, Cluster, identity, ProcessingFunction} from "./models";
/**
 * Calculates distance (aka dissmilarity) between two categorical vectors. They must have the same length
 * @param vectorA
 * @param vectorB
 */
export const calculateDistance = (vectorA : CategoricalVector, vectorB : CategoricalVector) : number => {
    if (vectorA.length != vectorB.length) throw Error(`Vectors must have the same length: ${vectorA} != ${vectorB}`);
    return R.zip(vectorA, vectorB).reduce((res, val) => val[0] === val[1] ? res : res + 1, 0)
};


/**
 * For a given vector get the cluster(s) with closest mode
 * @param vector
 * @param clusters
 * @param processingFunction
 */
export const getClosestClusters = (vector : CategoricalVector, clusters : Cluster[],
                                   processingFunction : ProcessingFunction = identity) : Cluster[] => {
    let processedVector = processingFunction(vector);
    return clusters.map(cluster => ({cluster, distance : calculateDistance(processedVector, cluster.mode)})).reduce(
        (res, item) => {
            if (res.length == 0 || item.distance < res[0].distance) return [item];
            if (item.distance === res[0].distance) return [...res, item];
            return res;
        },
        []
    ).map(item => item.cluster);
};

