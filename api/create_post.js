'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.endpoint = (event, context, callback) => {
  const data = JSON.parse(event.body);
  const requirements = ['content', 'type', 'author'];
  const room = 'contigo';

  for (var i = 0; i < requirements.length; i++) {
    const requirement = requirements[i];
    if (typeof data[requirement] !== 'string') {
      console.error('Validation failed!');
      callback(new Error("Couldn't create post"));
      return;
    }
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
      room: room
    }
  };

  dynamoDb.put(params, (error, result) => {
    if (error) {
      console.error("Adding post: ", error);
      callback(new Error("Couldn't create the post"));
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    };

    callback(null, response);
  });
};
