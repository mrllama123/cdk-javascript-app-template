const segment = {
  addNewSubsegment: () => ({ ...subsegment }),
};

const subsegment = {
  addNewSubsegment: () => ({ ...subsegment }),
  close: () => {},
};

module.exports = {
  getSegment: () => ({ ...segment }),
};
