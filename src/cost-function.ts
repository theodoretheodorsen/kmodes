import {CategoricalVector, ModeDistance} from "./models";
import {calculateDistance} from "./calculate-distance";

/**
 * Cost function: addition of the distances from each node to its respective closest mode
 * @param distances
 */
export const costFunction = (distances : ModeDistance[]) : number => {
    return distances.reduce((res, distance) => res + distance.distance, 0);
};



