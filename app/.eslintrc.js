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
    project: ['tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'lodash', 'unicorn'],
  rules: {
    'import/extensions': 'error',
    'no-unused-vars': ['warn', { ignoreRestSiblings: true }],
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'no-debugger': 'off',
    'no-restricted-exports': 'off', // https://github.com/airbnb/javascript/issues/2500
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state', 'total', 'acc'],
      },
    ],
    // lodash
    'lodash/import-scope': [2, 'member'],
    'lodash/prefer-lodash-method': 'off',
    // react
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
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
