import {CategoricalVector, Cluster, identity, JobResult, KmodesResult, ProcessingFunction} from "./src/models";
import * as R from "ramda";
import {logBestJob, runKmodes} from "./src/runKmodes";
import {getClusterWithClosestMode} from "./src/calculate-distance";
import {validate} from "./src/validation";

/**
 * Main method to calculate run the clustering of an array of categorical data
 * @param vectors: array of string containing the data to make the clusters from
 * @param numberOfClusters: number of clusters wished to create from the vectors
 * @param numberOfJobs: number of jobs wished to run to choose the best one from
 * @param iterationLimit: upper limit of iterations in each job in case the job does not converge
 * @param processingFunction: function used to determine what elements of the array to take into account
 * @param verbose: boolean which needs to be set to true to display information about the jobs in the console
 */
export const kmodes = (
    vectors : CategoricalVector[],
    numberOfClusters : number,
    numberOfJobs : number = 1,
    iterationLimit : number = 20,
    processingFunction : ProcessingFunction = identity,
    verbose : boolean = false
) : KmodesResult => {
    let jobs = R.range(0, numberOfJobs).map(i => runKmodes(vectors, numberOfClusters, iterationLimit, processingFunction, verbose, i));
    let best = jobs.reduce((res, job) => res == null ? job : R.minBy((jobRes) => jobRes.cost, res, job), null);
    if (verbose) {
        logBestJob(best);
    }
    let validation = validate(best.clusters);
    return {jobs, best, validation}
};

/**
 * Classify vectors provided a clustering with its modes
 * @param vectors: vectors to classify
 * @param clusters: clusters which are contained in the result of a job of the kmodes
 * @param processingFunction: function used to determine what elements of the array to take into account
 */
export const classifyVectors = (
    vectors : CategoricalVector[],
    clusters : Cluster[],
    processingFunction : ProcessingFunction = identity
    ) : CategoricalVector[] => {
    return vectors.map(vector => [getClusterWithClosestMode(vector, clusters, processingFunction).number.toString(), ...vector])
};



