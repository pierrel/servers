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


const postCreateRawConstraints = {
  content: { presence: true },
  type: { presence: true },
  author: { presence: true },
  timestamp: { datetime: true },
};

const postQueueLinkPostConstraints = {
  url: {
    presence: true,
    url: {
      schemes: ['https', 'http'],
    },
  },
  author: { presence: true },
  room: { presence: true },
};

module.exports = {
  postCreateRaw(post) {
    return validate(post, postCreateRawConstraints);
  },
  postQueueLinkPost(linkPayload) {
    return validate(linkPayload, postQueueLinkPostConstraints);
  },
};
