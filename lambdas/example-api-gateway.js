const handlerWrapper = require('../libs/http-handler-wrapper');

module.exports.handler = handlerWrapper(async (event) => {
  const { paramX } = event.body;

  if (!paramX) {
    throw new Error('ParamX is requerd');
  }

  // do something here

  return {
    a: 'a-value',
    b: 'b-value',
    event: {
      body: event.body,
      pathParameters: event.pathParameters,
      queryStringParameters: event.queryStringParameters,
    },
  };
});
