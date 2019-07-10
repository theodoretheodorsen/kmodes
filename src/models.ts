

export type CategoricalVector = string[];

export type ModeVectorCouple = {
    mode : CategoricalVector,
    vector : CategoricalVector
}

export type ModeDistance = ModeVectorCouple & {distance : number}