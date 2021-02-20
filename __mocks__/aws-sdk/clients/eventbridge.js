const mockEventBridgePutEvents = jest.fn().mockImplementation(() => ({
  promise: jest.fn().mockResolvedValue({
    FailedEntryCount: 0,
    Entries: [{ EventId: '123456' }],
  }),
}));

module.exports = jest.fn().mockImplementation(() => ({
  putEvents: mockEventBridgePutEvents,
}));

module.exports.mockEventBridgePutEvents = mockEventBridgePutEvents;
