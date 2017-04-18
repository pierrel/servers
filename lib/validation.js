const validate = require('validate.js');

const isStrongString = {
  presence: true,
  checkString(value) {
    if (typeof value !== 'string') {
      return {
        presence: { message: 'should be a string' },
      };
    }
    return false;
  },
};

const postCreateConstraints = {
  content: isStrongString,
  type: isStrongString,
  author: isStrongString,
  timestamp: {
    isDate: true,
  },
};

module.exports = {
  postCreate(post) {
    return validate(post, postCreateConstraints);
  },
};
