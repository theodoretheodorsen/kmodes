import {parseCsvFile} from "../parser";
import * as R from "ramda";
import {classifyVectors, kmodes} from "../../index";


const votesFile : string[][] = R.dropLast(1, parseCsvFile(''));

const fullRecords = votesFile.filter(f => !f.some(item => item === '?'));

const kmodesResult = kmodes(fullRecords, 2, 10, 20, R.drop(1), true);



console.log('Classified vectors: ');
classifyVectors(fullRecords, kmodesResult.best.clusters, R.drop(1)).forEach(v => console.log(JSON.stringify(v)));

console.log('Democrats in cluster 0: ' + kmodesResult.best.clusters[0].vectors.filter(fr => fr[0] === 'democrat').length);
console.log('Democrats in cluster 1: ' + kmodesResult.best.clusters[1].vectors.filter(fr => fr[0] === 'democrat').length);
console.log('Republicans in cluster 0: ' + kmodesResult.best.clusters[0].vectors.filter(fr => fr[0] === 'republican').length);
console.log('Republicans in cluster 1: ' + kmodesResult.best.clusters[1].vectors.filter(fr => fr[0] === 'republican').length);