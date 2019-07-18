import {CategoricalVector, Cluster, identity, JobResult, ProcessingFunction} from "./models";
import {initRandomly} from "./init-modes";
import {getClosestClusters} from "./calculate-distance";
import {calculateModeVector} from "./calculate-mode-vector";
import {costFunction} from "./cost-function";


export const runKmodes = (vectors: CategoricalVector[], nbClusters: number, limit: number,
                          processingFunction : ProcessingFunction = identity, verbose : boolean = false, jobNumber : number = -1): JobResult => {
    let clustersInited = initClusters(vectors, initRandomly(vectors, nbClusters), processingFunction);
    if (verbose) {
        logInitOfRun(jobNumber, costFunction(clustersInited, processingFunction))
    }
    let clusters = kmodesIteration(clustersInited, 0, limit, processingFunction, verbose, jobNumber);
    return {number : jobNumber, clusters, cost : costFunction(clusters, processingFunction)};
};

const kmodesIteration = (
    clusters: Cluster[],
    iteration: number,
    limit: number = 10,
    processingFunction: ProcessingFunction = identity,
    verbose: boolean = false,
    jobNumber: number = -1
): Cluster[] => {
    if (iteration >= limit) return clusters;
    let updatedClusters = clusters.map(c => ({mode: c.mode, vectors: [], number : c.number}));
    let noVectorChanged = true;
    for (let cluster of clusters) {
        for (let vector of cluster.vectors) {
            let closest = getClosestClusters(vector, updatedClusters, processingFunction);
            closest.vectors = [...closest.vectors, vector];
            if (!noVectorChanged || closest.mode != cluster.mode) noVectorChanged = false;
        }
    }
    if (noVectorChanged) {
        if (verbose) {
            console.log(`Job '${jobNumber}' converged after iteration '${iteration - 1}': cost of ${costFunction(clusters, processingFunction)}`)
        }
        return clusters;
    }
    updatedClusters.forEach(cluster => cluster.mode = calculateModeVector(cluster.vectors, processingFunction));
    if (verbose) {
        console.log(`Job '${jobNumber}', iteration '${iteration}': cost of ${costFunction(updatedClusters, processingFunction)}`);
    }
    return kmodesIteration(updatedClusters, iteration + 1, limit, processingFunction, verbose, jobNumber);
};

const initClusters = (vectors : CategoricalVector[], modes : CategoricalVector[], processingFunction: ProcessingFunction = identity) : Cluster[] => {
    let clusters : Cluster[] = modes.map(m => processingFunction(m)).map((mode, index) => ({mode, vectors : [], number : index}));
    return vectors.reduce((clusters : Cluster[], vector) => {
        let associatedCluster = getClosestClusters(vector, clusters, processingFunction);
        associatedCluster.vectors = [...associatedCluster.vectors, vector];
        associatedCluster.mode = calculateModeVector(associatedCluster.vectors, processingFunction);
        return clusters;
    }, clusters)
};


const logInitOfRun = (jobNumber : number, initCost : number) => {
    console.log(`#####################################################################################`);
    console.log(`Job number: ${jobNumber}`);
    console.log(`Cost after cluster initialization: ${initCost}`);
};

export const logBestJob = (best : JobResult) => {
    console.log(`#####################################################################################`);
    console.log(`################################       BEST       ###################################`);
    console.log(`Best job is number: ${best.number}`);
    console.log(`Best job cost: ${best.cost}`);
    console.log(`Best job modes: `);
    best.clusters.forEach(cluster => console.log(JSON.stringify(cluster.mode)));
    console.log(`#####################################################################################`);
};