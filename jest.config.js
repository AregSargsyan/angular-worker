module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['./setup-jest.ts'],
  globalSetup: 'jest-preset-angular/global-setup',
  roots: ['./src/'],
  collectCoverage: true,
  coverageReporters: ['html'],
};
