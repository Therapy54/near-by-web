let config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  testMatch: ['**/test/**/*.test.ts', '**/test/**/*.test.js'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.[jt]s$': 'ts-jest'
  }
};

export default config;
