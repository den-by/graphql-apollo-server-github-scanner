const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig')

module.exports = {
  collectCoverage: true,
  testTimeout: 10000,
  // preset: './jest.config.js',
  setupFiles: ['./jest.setup.ts'],
  testMatch: ['**/*.spec.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageReporters: ['json', 'html', 'lcov', 'text'],
  // collectCoverageFrom: ['packages/**/src/**/*.{ts,js}'],
  testPathIgnorePatterns: [
    "node_modules", "dist", "coverage", ".gitkeep"
  ],
  moduleDirectories: ['.', 'node_modules', 'src'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(
      compilerOptions.paths,
    ),
  },
  // testEnvironment: 'jest-environment-node',
  transform: {
    '^.+\\.(jsx?|tsx?)$': 'ts-jest'
  },
}
