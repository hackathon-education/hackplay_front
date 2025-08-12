import reactHooks from 'eslint-plugin-react-hooks';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';

import airbnbBase from 'eslint-config-airbnb-base';
import airbnbTs from 'eslint-config-airbnb-typescript';
import react from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      parser: 'espree',
      env: {
        browser: true,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      prettier: prettierPlugin,
    },
    rules: {
      ...airbnbBase.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,

      'prettier/prettier': 'error',
      'react/require-default-props': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      env: {
        browser: true,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      '@typescript-eslint': tsPlugin,
      'jsx-a11y': jsxA11y,
      prettier: prettierPlugin,
    },
    rules: {
      ...airbnbBase.rules,
      ...airbnbTs.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,

      'prettier/prettier': 'error',
      'react/require-default-props': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
