import {CategoricalVector, Cluster} from "./models";
import {initRandomly} from "./init-modes";
import {getClusterWithClosestMode} from "./calculate-distance";
import {calculateModeVector} from "./calculate-mode-vector";
import {costFunction} from "./cost-function";


export const kmodes = (vectors: CategoricalVector[], nbClusters: number, limit: number): CategoricalVector[] => {
    let clusters = initClusters(vectors, initRandomly(vectors, nbClusters));
    return kmodesIteration(getModes(clusters), clusters, 0, limit);
};

const kmodesIteration = (modes : CategoricalVector[], clusters : Cluster[], iteration : number, limit: number = 10): CategoricalVector[] => {
    if (iteration >= limit) return modes;
    for (let cluster of clusters) {
        for (let vector of cluster.vectors) {
            let closest = getClusterWithClosestMode(vector, clusters);
            if (closest != cluster) {
                cluster.vectors = cluster.vectors.filter(v => v! = vector);
                closest.vectors = [...closest.vectors, vector]
            }
        }
    }
    clusters.forEach(cluster => cluster.mode = calculateModeVector(cluster.vectors));
    console.log(`Iteration ${iteration}: cost of ${costFunction(clusters)}`);
    clusters.forEach(cluster => console.log(`Cluster ${cluster.mode} has ${cluster.vectors.length} vectors `));
    return kmodesIteration(getModes(clusters), clusters, iteration + 1, limit);
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

