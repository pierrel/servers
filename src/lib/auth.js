const generatePolicy = function(principalId, effect, resource) {
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }

  return authResponse;
};




module.exports.endpoint = (event, context, callback) => {
  const token = event.authorizationToken;

  // check the token against dynamo

  switch (token) {
  case 'allow':
    callback(null, generatePolicy('user', 'Allow', event.methodArn));
    break;
  case 'deny':
    callback(null, generatePolicy('user', 'Deny', event.methodArn));
    break;
  case 'unauthorized':
    callback('Unauthorized');
    break;
  default:
    callback('Error');
  }
};
