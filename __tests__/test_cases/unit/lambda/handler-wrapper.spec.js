const handlerWrapper = require('../../../../lambdas/libs/handler-wrapper');

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

  it('should return the payload from the wrapped function', async () => {
    const payload = { foo: 'bar' };

    const wrappedFn = handlerWrapper(async () => {
      return payload;
    });

    const result = await wrappedFn(
      { source: 'lambda-test', x: 'x-value' }, // event
      { userId: 'id-value' }, // context
    );
    expect(result).toBeDefined();
    expect(result).toBe(payload);
  });

  it('should buble the error if an error happend in the wrapped function', async () => {
    expect.hasAssertions();
    try {
      const wrappedFn = handlerWrapper(async () => {
        throw new Error('Something went wrong');
      });

      await wrappedFn(
        { source: 'lambda-test', x: 'x-value' }, // event
        { userId: 'id-value' }, // context
      );
    } catch (err) {
      expect(err).toBeDefined();
      expect(err.message).toBe('Something went wrong');
    }
  });
});
