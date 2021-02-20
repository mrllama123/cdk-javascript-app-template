const AWSXRay = require('aws-xray-sdk-core');

const trace = (key, parentSubsegment = null) => {
  if (!parentSubsegment) {
    return AWSXRay.getSegment().addNewSubsegment(key);
  }
  return parentSubsegment.addNewSubsegment(key);
};

module.exports = {
  trace,
};
