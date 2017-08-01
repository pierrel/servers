module.exports.endpoint = (event, context, callback) => {
  console.log('it passed!');

  const response = {
    statusCode: 200,
    body: 'correct',
  };
  callback(null, response);
};
