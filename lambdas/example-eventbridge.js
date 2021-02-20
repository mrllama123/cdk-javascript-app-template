const AWS = require('../libs/aws-sdk');
const handlerWrapper = require('../libs/handler-wrapper');

// initialize SDK clients and database connections outside of the function handler
const eventBridge = new AWS.EventBridge();

const doSomeBusinessLogic = (data = {}) => {
  return {
    ...data,
    status: 'done',
  };
};

const handler = handlerWrapper(async (event) => {
  // do something here
  const payload = doSomeBusinessLogic({ Keys: event.test });

  const eventBridgeEvent = {
    Entries: [
      {
        Source: process.env.SOURCE || 'source',
        EventBusName: process.env.EVENT_BUS_NAME || 'event-bus',
        DetailType: 'Example from JS Template - Status Done',
        Time: new Date(),
        Detail: JSON.stringify(payload),
      },
    ],
  };
  console.log('EVENTBRIDGE PUT PARAM\n', eventBridgeEvent);

  // send to eventBridge
  const result = await eventBridge.putEvents(eventBridgeEvent).promise();

  return result;
});

module.exports = {
  handler,
  doSomeBusinessLogic,
};
