module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  env: {
    es6: true,
    node: true,
    browser: true
  },
  extends: ['standard', 'plugin:sonarjs/recommended'],
  plugins: ['sonarjs'],
  globals: {},
  rules: {
    'array-element-newline': ['error', 'never'],
    'array-bracket-newline': ['error', 'never'],
    'operator-linebreak': ['error', 'before'],
    'eol-last': 0,
    'no-new': 'off',
    'no-multiple-empty-lines': 1,
    'arrow-parens': 0,
    camelcase: 0,
    'no-tabs': 'off',
    'generator-star-spacing': 'off',
    'space-before-function-paren': ['off', 'always']
  }
}