// run with (from parent dir) `node ./one-offs/import.js /path/to/data.json

const fs = require('fs');
const AWS = require('../lib/my-aws');

const s3 = AWS.S3();

console.log('processing ', process.argv[2]);
// this is for the final part
// const fileContents = fs.readFileSync(process.argv[2], 'utf8');
// const obj = JSON.parse(fileContents);
// console.log('done reading');


// first let's just get any image and upload that
function upload(file) {
  console.log('finish upload part');
}

upload(process.argv[2]);
