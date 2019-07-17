import {Cluster, identity, ProcessingFunction, Validation} from "./models";
import {calculateDistance} from "./calculate-distance";
import * as R from 'ramda';


export const getDistancesInCluster = (cluster : Cluster, processingFunction : ProcessingFunction = identity) : number[] => {
    return cluster.vectors
        .map(vectorOne => cluster.vectors.map(vectorTwo => calculateDistance(processingFunction(vectorOne), processingFunction(vectorTwo)))).reduce(
            (cum, it) => [...cum, ...it.filter(i => i > 0)]
        , []);
};

export const getDistancesBetweenModes = (clusters: Cluster[]): any[] => {
    return clusters.map(clusterOne => clusters.map(clusterTwo => (
        {
            clusterOne: clusterOne.number,
            clusterTwo: clusterTwo.number,
            distance: calculateDistance(clusterOne.mode, clusterTwo.mode)
        }
    ))).reduce((cum, it) => [...cum, ...it], [])
        .reduce((cum, it) => (it.distance == 0 || cum.some(item => item.clusterTwo === it.clusterOne && item.clusterOne === it.clusterTwo)) ? cum : [...cum, it], [])

};

export const validate = (clusters : Cluster[], processingFunction : ProcessingFunction) : Validation => {
    let distanceBetweenModes = getDistancesBetweenModes(clusters);
    let averageDistanceInClusters = clusters.map(cluster => R.mean(getDistancesInCluster(cluster, processingFunction)));
    return {distanceBetweenModes, averageDistanceInClusters}
};