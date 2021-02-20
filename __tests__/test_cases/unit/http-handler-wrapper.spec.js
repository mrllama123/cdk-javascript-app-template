const handlerWrapper = require('../../../libs/http-handler-wrapper');

describe('handlerWrapper', () => {
  it('should pass the event and context to the wrapped function', async () => {
    expect.hasAssertions();

    const wrappedFn = handlerWrapper(async (evt, ctx) => {
      expect(evt).toBeDefined();
      expect(ctx).toBeDefined();

      return { foo: 'bar' };
    });

    await wrappedFn(
      { source: 'lambda-test', x: 'x-value' }, // event
      { userId: 'id-value' }, // context
    );
  });

  it('should skip if is the warmup plugin', async () => {
    const wrappedFn = handlerWrapper(async () => {
      return { foo: 'bar' };
    });

    const result = await wrappedFn(
      { source: 'serverless-plugin-warmup' }, // warmup event
    );

    expect(result).toBeDefined();
    expect(result.message).toBe('serverless-plugin-warmup');
  });

  it('should return statusCode body and cors headers - success', async () => {
    const wrappedFn = handlerWrapper(async () => {
      return { foo: 'bar' };
    });

    const result = await wrappedFn(
      { source: 'lambda-test', x: 'x-value' }, // event
      { userId: 'id-value' }, // context
    );

    // check result
    expect(result).toBeDefined();
    expect(result.statusCode).toBeDefined();
    expect(result.statusCode).toBe(200);
    expect(result.body).toBeDefined();
    expect(result.body).toBe(JSON.stringify({ foo: 'bar' }));
    expect(result.headers).toBeDefined();
    expect(result.headers['Access-Control-Allow-Origin']).toBe('*');
    expect(result.headers['Access-Control-Allow-Credentials']).toBe(true);
  });

  it('should return statusCode body and cors headers - error', async () => {
    const wrappedFn = handlerWrapper(async () => {
      throw new Error('Something went wrong');
    });

    const result = await wrappedFn(
      { source: 'lambda-test', x: 'x-value' }, // event
      { userId: 'id-value' }, // context
    );

    // check result
    expect(result).toBeDefined();
    expect(result.statusCode).toBeDefined();
    expect(result.statusCode).toBe(500);
    expect(result.body).toBeDefined();
    expect(result.body).toBe(JSON.stringify({ error: 'Something went wrong' }));
    expect(result.headers).toBeDefined();
    expect(result.headers['Access-Control-Allow-Origin']).toBe('*');
    expect(result.headers['Access-Control-Allow-Credentials']).toBe(true);
  });
});
