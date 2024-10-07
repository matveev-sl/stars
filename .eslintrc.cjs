/* eslint-env node */
module.exports = {
  root: true,
  parser: 'vue-eslint-parser', // Используется для разбора файлов .vue
  parserOptions: {
    parser: '@typescript-eslint/parser', // Если используете TypeScript, иначе можно убрать
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    jest: true // Для поддержки Jest в тестах
  },
  extends: [
    'eslint:recommended', // Основные правила ESLint
    'plugin:vue/vue3-recommended', // Рекомендации для Vue 3
    'plugin:@typescript-eslint/recommended', // Если используете TypeScript
    'prettier', // Интеграция с Prettier для форматирования
    'eslint-config-prettier' // Отключает конфликтующие с Prettier правила
  ],
  plugins: [
    'vue', // Плагин для работы с Vue
    '@typescript-eslint' // Плагин для TypeScript (если используете TypeScript)
  ],
  rules: {
    // Правила ESLint
    'semi': [ 'error', 'always' ], // Точка с запятой обязательна
    'quotes': [ 'error', 'single' ], // Использование одинарных кавычек
    'indent': [ 'error', 2 ], // Отступ в 2 пробела
    'arrow-spacing': [ 'error' ], // Пробелы вокруг стрелок в стрелочных функциях
    'key-spacing': [ 'error' ], // Пробелы между ключами и значениями в объектах
    'array-bracket-spacing': [ 'error', 'always', { objectsInArrays: false }], // Пробелы в массивах
    'no-multi-spaces': [ 'error' ], // Запрет на множественные пробелы
    'no-trailing-spaces': 'error', // Запрет на пробелы в конце строк
    'object-curly-spacing': [ 'error', 'always' ], // Пробелы внутри фигурных скобок объектов
    'space-before-blocks': [ 'error', 'always' ], // Пробел перед блоками
    'space-in-parens': [ 'error', 'never' ], // Пробелы внутри круглых скобок
    'space-infix-ops': [ 'error' ], // Пробелы вокруг операторов
    'comma-spacing': [ 'error' ], // Пробелы перед/после запятой
    'comma-dangle': [ 'error', 'never' ], // Запрет на завершающую запятую
    'no-multiple-empty-lines': [ 'error', { max: 1, maxEOF: 0 }], // Не более одной пустой строки
    'max-len': [ 'error', { code: 196 }], // Максимальная длина строки — 96 символов
    'vue/multi-word-component-names': 'off', // Отключение правила на многословные имена компонентов Vue
    '@typescript-eslint/no-explicit-any': 'off' // Отключаем правило на запрет использования типа "any" в TypeScript
  }
};
