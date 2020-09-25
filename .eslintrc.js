module.exports = {
  env: {
    mocha: true,
    node: true
  },
  globals: {
    assertNoError: true,
    should: true
  },
  extends: ['digitalbazaar'],
  ignorePatterns: ['node_modules/']
};
