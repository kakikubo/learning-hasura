import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  rootDir: __dirname,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/node_modules/jest-css-modules',
    '^msw$': '<rootDir>/node_modules/msw/lib/index.js',
    '^@mswjs$': '<rootDir>/node_modules/@mswjs',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!msw|@mswjs)'],
  modulePaths: ['<rootDir>/src'],
};

export default config;
