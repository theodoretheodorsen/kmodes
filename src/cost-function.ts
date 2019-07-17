import {Cluster, identity, ProcessingFunction} from "./models";
import {calculateDistance} from "./calculate-distance";

/**
 * Cost function: addition of the distances from each node to its respective closest mode
 * @param cluster
 * @param processingFunction
 */
export const costFunction = (cluster : Cluster[], processingFunction : ProcessingFunction = identity) : number => {
    return cluster.reduce((cost, cluster) => cost + calculateClusterCost(cluster, processingFunction), 0)
};

const calculateClusterCost = (cluster : Cluster, processingFunction : ProcessingFunction = identity) : number => {
    return cluster.vectors.reduce( (cost, vector) => cost + calculateDistance(processingFunction(vector), cluster.mode), 0)
};


