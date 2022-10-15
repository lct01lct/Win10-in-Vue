module.exports = {
  env: {
    browser: true,
    es2021: true,
  },

  extends: ['standard', 'plugin:prettier/recommended'],
  parser: 'vue-eslint-parser',

  parserOptions: {
    requireConfigFile: false,
    sourceType: 'module',
  },

  plugins: ['prettier'],

  rules: {
    semi: ['error', 'always'],
    'comma-dangle': 'off',
    'vue/comment-directive': 'off',
    'space-before-function-paren': 'off',
    'vue/multi-word-component-names': 'off',
    'no-undef': 'off',
  },

  overrides: [
    {
      files: ['*.vue'],
    },
  ],
};
