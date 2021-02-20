module.exports = {
  testEnvironment: "node",
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['**/__tests__/test_cases/**/*', "!**/node_modules/**"],
  coverageDirectory: "coverage",
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/__tests__/lib", "<rootDir>/__tests__/steps"],
};
