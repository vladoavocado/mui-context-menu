const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve('../../', '.prettierrc'), 'utf8'),
);

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'no-undef': 'off', // TypeScript already checks for undefined variables
    'no-redeclare': ['error', { builtinGlobals: true }],
    'react/prop-types': 0,
    'react/no-unused-prop-types': 0,
    'no-unused-vars': 'off',
    'no-shadow': 0,
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-unused-vars': 'error',
    'prettier/prettier': ['error', prettierOptions],
    'import/no-extraneous-dependencies': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-unresolved': [2, { ignore: ['\\?as=webp$', '\\?url'] }],
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'import/prefer-default-export': 0,
    'react/require-default-props': 0,
    'react/jsx-props-no-spreading': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-no-useless-fragment': 0,
  },
  settings: {
    'import/resolver': {
      typescript: {},
      alias: {
        map: [['src', './src']],
        extensions: [
          '.ts',
          '.js',
          '.jsx',
          '.tsx',
          '.woff',
          '.woff2',
          '.otf',
          '.ttf',
        ],
      },
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': [
          'error',
          { ignoreDeclarationMerge: true },
        ],
        'no-dupe-class-members': 'off',
      },
    },
  ],
  globals: {
    React: true,
    expect: true,
    jsdom: true,
    JSX: true,
  },
};
