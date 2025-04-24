module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': [
      // x? means x is optional
      'ts-jest',
      {
        tsconfig: './tsconfig.json',
      },
    ],
  },
}
