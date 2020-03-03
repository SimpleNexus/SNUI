module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverageFrom: ['src/**/*.{js,vue}'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/*.stories.js'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/config/jest/setup.js'
  ],
  silent: true,
  verbose: false
}
