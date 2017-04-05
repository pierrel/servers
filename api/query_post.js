const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.endpoint = (event, context, callback) => {
  const room = 'contigo';

  const dynamoParams = {
    TableName: process.env.POSTS_TABLE,
    IndexName: 'room-createdAt-index',
    KeyConditionExpression: 'room = :room',
    ExpressionAttributeValues: {
      ':room': room,
    },
    ReturnConsumedCapacity: 'TOTAL',
  };

  dynamoDb.query(dynamoParams, (error, result) => {
    if (error) {
      console.error('querying: ', error);
      callback(new Error("Couldn't query the room ", room));
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(result.Items),
      });
    }
  });
};
