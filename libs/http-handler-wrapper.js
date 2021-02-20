const handlerWrapper = (lambda) => async (event, context) => {
  let body, statusCode;
  try {
    // early return if warmup plugin
    if (event.source && event.source === 'serverless-plugin-warmup') {
      return { message: 'serverless-plugin-warmup' };
    }
    console.log('Warm up skipped');

    console.log(
      'API EVENT\n',
      JSON.stringify(
        {
          body: event.body,
          pathParameters: event.pathParameters,
          queryStringParameters: event.queryStringParameters,
        },
        null,
        2,
      ),
    );

    // call lambda
    body = await lambda(event, context);
    statusCode = 200;
  } catch (err) {
    body = { error: err.message };
    statusCode = 500;
  }

  const result = {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  };

  console.log('RESULT\n', JSON.stringify(result, null, 2));

  // Return HTTP response
  return result;
};

module.exports = handlerWrapper;
