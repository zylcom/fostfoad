/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-prettier",
    "plugin:vitest/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  overrides: [
    {
      files: [
        "cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}",
        "*.{test,spec}.{js,ts,jsx,tsx}",
        "cypress.config.js",
      ],
      rules: { "no-undef": "off" },
      extends: ["plugin:cypress/recommended"],
    },
  ],
};
