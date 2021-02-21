const { NodejsFunction } = require('@aws-cdk/aws-lambda-nodejs');
const cdkLambda = require('@aws-cdk/aws-lambda');
const path = require('path');
const { Duration } = require('@aws-cdk/core');
const { createPolicy } = require('./iam');

const assignPolicyToLambda = (lambda, policy) => {
  lambda.addToRolePolicy(createPolicy(policy.actions, policy.resources));
};

const createNodejsLambda = ({
  stack,
  lambdaName,
  lambdaCodePath,
  maxEventAge = Duration.seconds(1800),
  retryAttempts = 2,
  runtime = cdkLambda.Runtime.NODEJS_12_X,
  polices = [],
}) => {
  const lambda = new NodejsFunction(stack, lambdaName, {
    runtime,
    entry: path.resolve(lambdaCodePath),
    maxEventAge,
    retryAttempts,
    tracing: cdkLambda.Tracing.ACTIVE,
  });
  // add xray permissions
  lambda.addToRolePolicy(
    createPolicy(['xray:PutTraceSegments', 'xray:PutTelemetryRecords'], ['*']),
  );
  polices.forEach((policy) => assignPolicyToLambda(lambda, policy));
  return lambda;
};

module.exports = { createNodejsLambda };
