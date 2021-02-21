#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { EventBridgeLambdaStack } = require('./libs-cdk/stacks/event-bridge');

const app = new cdk.App();
new EventBridgeLambdaStack(app, `${app.node.tryGetContext("stage")}-eventbridge-example`);
