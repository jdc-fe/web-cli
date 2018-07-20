module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
     // maximum line length
    "max-len": [1, {
      code: 80,
      tabWidth: 2,
      ignoreComments: true,
      ignoreUrls: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true
    }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}