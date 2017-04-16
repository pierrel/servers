// Need this file because offline doesn't set the region...
// Although some people seem to think it does: https://github.com/serverless/serverless/issues/1029
const AWS = require('aws-sdk');

if (!AWS.config.region) {
  AWS.config.update({
    region: process.env.REGION,
  });
}

module.exports = AWS;
