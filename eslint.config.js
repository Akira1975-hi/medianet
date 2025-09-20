// eslint.config.js
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default [
  // игноры вместо .eslintignore
  { ignores: ['dist/**', 'node_modules/**', 'coverage/**'] },

  js.configs.recommended,

  // браузерные файлы с JSX
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      // <<< ВАЖНО: сообщаем про глобалы браузера
      globals: { ...globals.browser },
    },
    settings: { react: { version: 'detect' } },
    plugins: { react, 'react-hooks': reactHooks },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },

  // (необязательно) Node-глобалы для конфигов
  {
    files: ['vite.config.*', 'eslint.config.js'],
    languageOptions: { globals: { ...globals.node } },
  },

  // ДОЛЖЕН быть ПОСЛЕДНИМ — отключает правила, конфликтующие с Prettier
  prettier,
];
