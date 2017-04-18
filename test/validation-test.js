const validate = require('../lib/validation.js');

const qunit = Qunit; // eslint-disable-line no-undef

qunit.test('validation correctly validates a post', (assert) => {
  assert.equal(validate.post_create({
    something: 'else',
  }), undefined);
});
