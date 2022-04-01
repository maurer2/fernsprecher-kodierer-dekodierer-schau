module.exports = {
  env: {
    es2021: true,
    node: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb-typescript',
    'unicorn',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react-hooks/recommended',
    'plugin:lodash/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'lodash',
  ],
  rules: {
    'import/extensions': 'off',
    'no-unused-vars': ["warn", { "ignoreRestSiblings": true }],
    // lodash
    'lodash/import-scope': [2, 'member'],
    'lodash/prefer-lodash-method': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
