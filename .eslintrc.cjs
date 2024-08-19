/* eslint-env node */
module.exports = {
  root: true,
  'extends': [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    // Здесь вы можете добавить свои правила или переопределить существующие
    'semi': [ 'error', 'always' ],
    'quotes': [ 'error', 'single' ],
    'indent': [ 'error', 2 ],
    'arrow-spacing': [ 'error' ],
    'key-spacing': [ 'error' ],
    'array-bracket-spacing': [ 'error', 'always', { 'objectsInArrays': false }],
    'no-multi-spaces': [ 'error' ],
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [ 'error', 'always' ],
    'space-before-blocks': [ 'error', 'always' ],
    'space-in-parens': [ 'error', 'never' ],
    'space-infix-ops': [ 'error' ],
    'comma-spacing': [ 'error' ],
    'comma-dangle': [ 'error', 'never' ],
    'no-multiple-empty-lines': [ 'error', { 'max': 1, 'maxEOF': 0 }],
    'max-len': [ 'error', { 'code': 96 }],
    'vue/multi-word-component-names': 'off' // Пример отключения правила для имен компонентов
  }
};
