const { handler } = require('../../../lambdas/example-api-gateway');

describe('handler', () => {
  it('should return statusCode body and cors headers - success', async () => {
    const result = await handler({
      source: 'test',
      body: { paramX: 'x-value' },
    });

    // check result
    expect(result).toBeDefined();
    expect(result.statusCode).toBeDefined();
    expect(result.statusCode).toBe(200);
    expect(result.body).toBeDefined();
    expect(result.headers).toBeDefined();
    expect(result.headers['Access-Control-Allow-Origin']).toBe('*');
    expect(result.headers['Access-Control-Allow-Credentials']).toBe(true);
  });

  it('should return statusCode body and cors headers - error', async () => {
    const result = await handler({
      source: 'test',
      body: { paramY: 'y-value' },
    });

    // check result
    expect(result).toBeDefined();
    expect(result.statusCode).toBeDefined();
    expect(result.statusCode).toBe(500);
    expect(result.body).toBeDefined();
    expect(result.headers).toBeDefined();
    expect(result.headers['Access-Control-Allow-Origin']).toBe('*');
    expect(result.headers['Access-Control-Allow-Credentials']).toBe(true);
  });
});
