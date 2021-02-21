const cdk = require('@aws-cdk/core');
const { createNodejsLambda } = require('../components/lambda');

class EventBridgeLambdaStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);
    createNodejsLambda({
      stack: this,
      lambdaName: `${this.node.tryGetContext('stage')}-example-eventbridge`,
      lambdaCodePath: 'lambdas/example-eventbridge.js',
    });
  }
}

module.exports = { EventBridgeLambdaStack };
