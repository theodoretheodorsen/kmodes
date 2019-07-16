import {CategoricalVector, Cluster} from "./models";
import {initRandomly} from "./init-modes";
import {getClusterWithClosestMode} from "./calculate-distance";
import {calculateModeVector} from "./calculate-mode-vector";
import {costFunction} from "./cost-function";


export const kmodes = (vectors: CategoricalVector[], nbClusters: number, limit: number,
                       processingFunction : (line : string[]) => string[] = (line : string[]) => line): Cluster[] => {
    let clusters = initClusters(vectors, initRandomly(vectors, nbClusters));
    console.log('Cost of initialization: ' + costFunction(clusters));
    return kmodesIteration(clusters, 0, limit, processingFunction);
};

const kmodesIteration = (clusters : Cluster[], iteration : number, limit: number = 10,
                         processingFunction : (line : string[]) => string[] = (line : string[]) => line): Cluster[] => {
    if (iteration >= limit) return clusters;
    let updatedClusters = clusters.map(c => ({mode : c.mode, vectors : []}));
    for (let cluster of clusters) {
        for (let vector of cluster.vectors) {
            let closest = getClusterWithClosestMode(vector, updatedClusters, processingFunction);
            closest.vectors = [...closest.vectors, vector];
        }
    }
    updatedClusters.forEach(cluster => cluster.mode = calculateModeVector(cluster.vectors));
    console.log(`Iteration ${iteration}: cost of ${costFunction(updatedClusters)}`);
    return kmodesIteration(updatedClusters, iteration + 1, limit);
};

const initClusters = (vectors : CategoricalVector[], modes : CategoricalVector[]) : Cluster[] => {
    let clusters : Cluster[] = modes.map(mode => ({mode, vectors : []}));
    return vectors.reduce((clusters : Cluster[], vector) => {
        let associatedCluster = getClusterWithClosestMode(vector, clusters);
        associatedCluster.vectors = [...associatedCluster.vectors, vector];
        associatedCluster.mode = calculateModeVector(associatedCluster.vectors);
        return clusters;
    }, clusters)
};

const getModes = (clusters : Cluster[]) : CategoricalVector[] => {
    return clusters.map(cluster => cluster.mode);
};

