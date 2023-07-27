module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    // "eslint:recommended",
    // "plugin:@typescript-eslint/recommended",
    // "plugin:react/recommended"
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'react',
  ],
  rules: {
    'no-console': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    'import/prefer-default-export': 'off',
    'linebreak-style': [0, 'error', 'windows'],
    quotes: 'off',
    '@typescript-eslint/quotes': 'off',
    'import/no-extraneous-dependencies': 'off',
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "": "never",
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never"
      }
    ]
  },
};
