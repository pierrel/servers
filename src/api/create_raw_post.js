const AWS = require('../lib/my-aws');
const uuid = require('uuid');
const validate = require('../lib/validation.js');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.endpoint = (event, context, callback) => {
  const data = JSON.parse(event.body);
  const room = 'contigo';

  console.log('validating');
  const validationErrors = validate.postCreateRaw(data);
  if (validationErrors) {
    console.error('Validation failed!');
    callback(new Error("Couldn't create raw post: ", validationErrors));
  }
  const timestamp = data.timestamp || new Date().getTime();

  const params = {
    TableName: process.env.POSTS_TABLE,
    Item: {
      id: uuid.v1(),
      content: data.content,
      author: data.author,
      type: data.type,
      createdAt: timestamp,
      room,
    },
  };

  dynamoDb.put(params, (error, result) => {
    if (error) {
      console.error('Adding post: ', error);
      callback(new Error("Couldn't create the raw post"));
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };

    callback(null, response);
  });
};
