const validate = require('../lib/validation.js');

const qunit = QUnit; // eslint-disable-line no-undef

qunit.test('a valid post without a timestamp', (assert) => {
  assert.equal(validate.postCreate({
    author: 'New Amaral',
    content: 'https://github.com/serverless/examples/tree/master/aws-node-rest-api-with-dynamodb',
    type: 'link',
  }, undefined));
});

qunit.test('a valid post with timestamp', (assert) => {
  assert.equal(validate.postCreate({
    author: 'New Amaral',
    content: 'https://github.com/serverless/examples/tree/master/aws-node-rest-api-with-dynamodb',
    type: 'link',
    timestamp: '2017-01-02',
  }, undefined));
});

qunit.test('author name is required', (assert) => {
  assert.notEqual(validate.postCreate({
    content: 'https://github.com/serverless/examples/tree/master/aws-node-rest-api-with-dynamodb',
    type: 'link',
  }, undefined));
});

qunit.test('content is required', (assert) => {
  assert.notEqual(validate.postCreate({
    author: 'New Amaral',
    type: 'link',
  }, undefined));
});

qunit.test('type is required', (assert) => {
  assert.notEqual(validate.postCreate({
    author: 'New Amaral',
    content: 'https://github.com/serverless/examples/tree/master/aws-node-rest-api-with-dynamodb',
  }, undefined));
});
