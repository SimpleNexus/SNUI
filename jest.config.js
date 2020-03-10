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
  // For Lottie
  setupFiles: ['jest-canvas-mock'],
  silent: false,
  verbose: false
}
