module.exports = {
  root: true,
  env: {
    // es6: true,
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: [],
  rules: {
    "no-unused-vars": ["error", { "varsIgnorePattern": "_", "argsIgnorePattern": "_" }]
  },
  settings: {
    "react": {
      "version": "detect"
    }
  }
}
