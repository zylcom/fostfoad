/* eslint-env node */
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  responseTimeout: 10000,
  requestTimeout: 10000,
  pageLoadTimeout: 100000,
  e2e: {
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}",
    baseUrl: "http://localhost:4173",
  },
  video: false,
});
