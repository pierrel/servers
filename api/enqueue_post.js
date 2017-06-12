const AWS = require('../lib/my-aws');
const request = require('request');
const validate = require('../lib/validation.js');

module.exports.endpoint = (event, context, callback) => {
  const data = JSON.parse(event.body);
  const room = 'contigo';

  console.log('validating');
  const validationErrors = validate.postQueueLinkPost(data);
  if (validationErrors) {
    console.error('Validation failed!');
    callback({
      statusCode: 400,
      body: JSON.stringify({error: "did not pass validation: " + validationErrors}),
    });
    return;
  }
  const timestamp = new Date().getTime();

  console.log('checking url');
  request({
    method: 'HEAD',
    uri: data.url,
    timeout: 500,
  }, (error, response, body) => {
    if (error) { 
      callback({
        statusCode: 400,
        body: JSON.stringify({error: "url is not valid"}),
      });
    } else if (response.statusCode === 200) {
      callback(null, { statusCode: 200 });
    }
  });
}

