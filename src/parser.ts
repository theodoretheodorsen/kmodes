import {readFileSync} from "fs";


export const parseCsvFile = (path : string, separator : string = ",") : string[][] => {
    return readFileSync(path, 'utf8').split('\n').map(line => line.split(separator))
};
