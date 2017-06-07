// run with (from parent dir) `node ./one-offs/import.js /path/to/data.json

const fs = require('fs');

console.log('processing ', process.argv[2]);
const fileContents = fs.readFileSync(process.argv[2], 'utf8');
const obj = JSON.parse(fileContents);
console.log('done reading');

const done = obj.filter((post) => {
  const comments = post.comments;
  if (comments) {
    return comments.length > 0;
  }

  return false;
}).map(post => ({
  author: post.comments[0].author,
  content: post.post.content,
  type: post.post.type,
  timestamp: Date.parse(post.comments[0].date),
  comments: post.comments.map(comment => ({
    author: comment.author,
    content: comment.content,
    type: comment.type,
    timestamp: Date.parse(comment.date),
  })),
}));

console.log(JSON.stringify(done[0]));
console.log('done');
