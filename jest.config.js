module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./src/setupTest.ts'],
  globalSetup: './src/jestGlobalSetup.ts',
  verbose: true,
  testPathIgnorePatterns: ['build'],
};
