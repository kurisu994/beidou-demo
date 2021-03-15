module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ['./base.js', './react.js', './typescript.js'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __CLIENT__: true,
    __SERVER__: true,
    __DEV__: true
  },
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      ecmaVersion: 6,
      sourceType: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
};
