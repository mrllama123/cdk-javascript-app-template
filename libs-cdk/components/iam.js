const { PolicyStatement, Effect } = require('@aws-cdk/aws-iam');

const createPolicy = (actions, resources) => {
  return new PolicyStatement({
    effect: Effect.ALLOW,
    actions,
    resources,
  });
};

module.exports = { createPolicy };
