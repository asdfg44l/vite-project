module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    // Add under other rules
    "@vue/prettier",
  ],

  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2021,
  },
  plugins: [],
  rules: {
    "vue/multi-word-component-names": ["off"],
  },
};
