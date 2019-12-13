module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['server', 'node_modules'],
  globals: {
    'ts-jest': {
      tsConfig: './server/tsconfig.json'
    }
  }
};
