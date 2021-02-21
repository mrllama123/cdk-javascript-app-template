const { mockEventBridgePutEvents } = require('aws-sdk/clients/eventbridge');
const {
  handler,
  doSomeBusinessLogic,
} = require('../../../../lambdas/example-eventbridge');

const eventInputTest = require('../../../../events/test-event.json');

describe('doSomeBusinessLogic', () => {
  it('should return an object with status done', async () => {
    const fixture = {
      a: 'a',
      b: 'b',
      status: 'pending',
    };

    const expected = {
      ...fixture,
      status: 'done',
    };

    const result = doSomeBusinessLogic(fixture);

    expect(result).toStrictEqual(expected);
  });
});

describe('handler', () => {
  beforeEach(() => {
    // if you need to change the default mock return from __mocks__ use the example bellow
    mockEventBridgePutEvents.mockReset();
    mockEventBridgePutEvents.mockImplementation(() => ({
      promise() {
        return Promise.resolve({
          FailedEntryCount: 0,
          Entries: [{ EventId: '654321' }],
        });
      },
    }));
  });

  it('should been called with the correct params', async () => {
    const result = await handler(eventInputTest, null);

    // check params
    expect(mockEventBridgePutEvents).toHaveBeenCalledTimes(1);

    const paramsEntriesBody =
      mockEventBridgePutEvents.mock.calls[0][0].Entries[0];
    expect(paramsEntriesBody.Source).toStrictEqual('source');
    expect(paramsEntriesBody.EventBusName).toBeDefined();
    expect(paramsEntriesBody.DetailType).toBeDefined();
    expect(paramsEntriesBody.Time).toBeDefined();
    expect(paramsEntriesBody.Detail).toBeDefined();

    const paramsDetails = JSON.parse(paramsEntriesBody.Detail);
    expect(paramsDetails.Keys).toBeDefined();
    expect(paramsDetails.status).toBeDefined();
    expect(paramsDetails.status).toBe('done');

    // check result
    expect(result).toBeDefined();
  });
});
