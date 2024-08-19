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
    'vue/multi-word-component-names': 'off', // Пример отключения правила для именования компонентов
  }
}
