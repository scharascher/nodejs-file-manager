module.exports = {
  "root": true,
  "extends": [
    "eslint:recommended",
    "plugin:node/recommended",
    "prettier"
  ],
  "plugins": [
    "prettier"
  ],
  "env": {
    "browser": true,
    "commonjs": true,
    "es2021": true
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  }
}