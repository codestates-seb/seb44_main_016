module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    '@typescript-eslint/no-var-requires': 0,
    'prettier/prettier': [
      'error',
      {
        // .prettierrc
        singleQuote: true,
        jsxSingleQuote: true,
        semi: true,
        useTabs: false,
        tabWidth: 2,
        printWidth: 120,
        bracketSpacing: true,
        arrowParens: 'always',
        endOfLine: 'lf',
      },
    ],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};
