const { expect, haveResourceLike } = require('@aws-cdk/assert');
const cdk = require('@aws-cdk/core');
const {
  EventBridgeLambdaStack,
} = require('../../../../libs-cdk/stacks/event-bridge');

describe('event bridge stack', () => {
  let app = null;
  let stack = null;

  beforeAll(() => {
    console.log('creating stack');
    app = new cdk.App();
    stack = new EventBridgeLambdaStack(app, 'testStack');
  });

  it('should have a lambda in stack', () => {
    expect(stack).to(
      haveResourceLike('AWS::Lambda::Function', {
        Handler: 'index.handler',
        Runtime: 'nodejs12.x',
      }),
    );
  });
});
