module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "babel-eslint",
  },
  extends: [
    "@nuxtjs",
    "eslint:recommended",
    "plugin:vue/recommended",
    "plugin:nuxt/recommended",
  ],
  plugins: ["vue"],
  // add your custom rules here
  rules: {
    semi: [2, "never"],
    "no-console": "off",
    "vue/max-attributes-per-line": "off",
  },
};
