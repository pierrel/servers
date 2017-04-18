const validate = require('../lib/validation.js');

const qunit = QUnit; // eslint-disable-line no-undef

qunit.test('validation correctly validates a post', (assert) => {
  assert.equal(validate.postCreate({
    author: 'New Amaral',
    content: 'https://github.com/serverless/examples/tree/master/aws-node-rest-api-with-dynamodb',
    type: 'link',
  }, undefined));
});
