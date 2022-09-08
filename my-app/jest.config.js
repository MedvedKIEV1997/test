module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['./src/setupTests.ts'],
    testEnvironmentOptions: {
        URL: 'http://localhost:8000/'
    }
};
