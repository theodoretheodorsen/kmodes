import {Cluster} from "./models";
import {calculateDistance} from "./calculate-distance";

/**
 * Cost function: addition of the distances from each node to its respective closest mode
 * @param cluster
 */
export const costFunction = (cluster : Cluster[]) : number => {
    return cluster.reduce((cost, cluster) => cost + calculateClusterCost(cluster), 0)
};

const calculateClusterCost = (cluster : Cluster) : number => {
    return cluster.vectors.reduce( (cost, vector) => cost + calculateDistance(vector, cluster.mode), 0)
};


