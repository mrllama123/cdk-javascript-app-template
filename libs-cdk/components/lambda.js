const { NodejsFunction } = require('@aws-cdk/aws-lambda-nodejs');
const cdkLambda = require('@aws-cdk/aws-lambda');
const path = require('path');
const { Duration } = require('@aws-cdk/core');

const createNodejsLambda = ({
  stack,
  lambdaName,
  lambdaCodePath,
  maxEventAge = Duration.seconds(1800),
  retryAttempts = 2,
  runtime = cdkLambda.Runtime.NODEJS_12_X,
}) => {
  return new NodejsFunction(stack, lambdaName, {
    runtime,
    entry: path.resolve(lambdaCodePath),
    maxEventAge,
    retryAttempts,
  });
};

module.exports = { createNodejsLambda };
