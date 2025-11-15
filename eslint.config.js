import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        global: 'readonly',
        Buffer: 'readonly',
        // DOM APIs
        document: 'readonly',
        window: 'readonly',
        HTMLElement: 'readonly',
        HTMLFormElement: 'readonly',
        HTMLInputElement: 'readonly',
        Event: 'readonly',
        MessageEvent: 'readonly',
        BroadcastChannel: 'readonly',
        BroadcastChannelEventMap: 'readonly',
        AddEventListenerOptions: 'readonly',
        EventListenerOptions: 'readonly',
        // Browser APIs
        alert: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      react: react,
      'react-hooks': reactHooks,
    },
    rules: {
      // 基本的なJavaScript/TypeScriptルール
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      // React関連のルール
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/react-in-jsx-scope': 'off', // Next.jsでは不要
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // Node.js設定ファイル用の設定
  {
    files: [
      '**/*.config.{js,ts}',
      '**/jest.*.{js,ts}',
      '**/__mocks__/**/*.{js,ts}',
    ],
    languageOptions: {
      globals: {
        // Node.js globals
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        // Jest globals for setup files
        jest: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
      },
    },
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },

  // テストファイル用の設定
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/__tests__/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        // Jest globals
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        beforeEach: 'readonly',
        afterAll: 'readonly',
        afterEach: 'readonly',
        jest: 'readonly',
        waitFor: 'readonly',
      },
    },
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },

  // 除外設定
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'dist/**',
      '*.config.js',
      '*.config.mjs',
      '*.config.cjs',
      'types/generated/**',
    ],
  },
];
