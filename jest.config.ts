import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  testMatch: [
    '**/src/**/*.test.tsx',
    '**/src/**/*.spec.tsx',
    '**/src/**/*.test.ts',
    '**/src/**/*.spec.ts'
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
};

export default config;
