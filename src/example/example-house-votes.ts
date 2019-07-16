import {parseCsvFile} from "../parser";
import {kmodes} from "../kmodes";
import * as R from "ramda";


const votesFile : string[][] = R.dropLast(1, parseCsvFile(''));

const fullRecords = votesFile.filter(f => !f.some(item => item === '?'));

const clusters = kmodes(fullRecords, 2, 3, R.drop(1));

console.log('Democrats in cluster 0: ' + clusters[0].vectors.filter(fr => fr[0] === 'democrat').length);
console.log('Democrats in cluster 1: ' + clusters[1].vectors.filter(fr => fr[0] === 'democrat').length);
console.log('Republicans in cluster 0: ' + clusters[0].vectors.filter(fr => fr[0] === 'republican').length);
console.log('Republicans in cluster 1: ' + clusters[1].vectors.filter(fr => fr[0] === 'republican').length);