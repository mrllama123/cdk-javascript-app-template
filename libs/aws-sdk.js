const AWS = require('aws-sdk');
const AWSXRay = require('aws-xray-sdk-core');

// Do not enable tracing for 'serverless invoke local' (IS_LOCAL)
// and for local tests (process.env.NODE_ENV)
const isLocal = process.env.IS_LOCAL || process.env.NODE_ENV === 'test';

module.exports = isLocal ? AWS : AWSXRay.captureAWS(AWS);
