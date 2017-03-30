'use strict';

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.endpoint = (event, context, callback) => {
  const data = JSON.parse(event.body);
  const lastId = data.lastId;
  const limit = 20;

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: `Starting at ${lastId} and getting ${limit} posts`
    })
  });
};
