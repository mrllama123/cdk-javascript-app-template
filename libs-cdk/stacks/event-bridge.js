const cdk = require('@aws-cdk/core');
const { lambda } = require('@mrllama123/cdk-common-config');

class EventBridgeLambdaStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);
    lambda.createNodejsLambda(
      this,
      `${this.node.tryGetContext('stage')}-example-eventbridge`,
      'lambdas/example-eventbridge.js',
    );
  }
}

module.exports = { EventBridgeLambdaStack };
