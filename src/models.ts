

export type CategoricalVector = string[];


export type Cluster = {
    number : number,
    mode : CategoricalVector,
    vectors : CategoricalVector[]
}

export type ProcessingFunction = (vector : CategoricalVector) => CategoricalVector;

export const identity : ProcessingFunction = (vector => vector);

export type JobResult = {
    number : number,
    clusters : Cluster[],
    cost : number
}

export type KmodesResult = {
    jobs : JobResult[],
    best : JobResult
}