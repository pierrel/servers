const validate = require('validate.js');
const moment = require('moment');

// Before using it we must add the parse and format functions
// Here is a sample implementation using moment.js
validate.extend(validate.validators.datetime, {
  // The value is guaranteed not to be null or undefined but otherwise it
  // could be anything.
  parse(value) {
    return moment.utc(value);
  },
  // Input is a unix timestamp
  format(value, options) {
    const format = options.dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD hh:mm:ss';
    return moment.utc(value).format(format);
  },
});


const postCreateConstraints = {
  content: { presence: true },
  type: { presence: true },
  author: { presence: true },
  timestamp: { datetime: true },
};

module.exports = {
  postCreate(post) {
    return validate(post, postCreateConstraints);
  },
};
