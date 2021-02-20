const handlerWrapper = (lambda) => async (event, context) => {
  try {
    // early return if warmup plugin
    if (event.source && event.source === 'serverless-plugin-warmup') {
      return { message: 'serverless-plugin-warmup' };
    }
    console.log('Warm up skipped');

    console.log('EVENT\n', JSON.stringify(event, null, 2));

    // call lambda
    const result = await lambda(event, context);

    console.log('RESULT\n', JSON.stringify(result, null, 2));

    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = handlerWrapper;
