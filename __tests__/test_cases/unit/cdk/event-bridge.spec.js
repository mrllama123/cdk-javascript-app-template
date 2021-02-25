const { expect, haveResourceLike } = require('@aws-cdk/assert');
const cdk = require('@aws-cdk/core');
const {
  EventBridgeLambdaStack,
} = require('../../../../libs-cdk/stacks/event-bridge');

describe('event bridge stack', () => {
  const app = new cdk.App();
  const stack = new EventBridgeLambdaStack(app, 'testStack');

  it('should have a lambda in stack', () => {
    expect(stack).to(
      haveResourceLike('AWS::Lambda::Function', {
        Handler: 'index.handler',
        Runtime: 'nodejs12.x',
      }),
    );
  });
});
