
Ну и чисто теоретические "задачки", их больше на синтаксис массивов, объектов, строк. 

1. У тебя есть массив "людей" тебе надо вернуть одно число - разницу между самым взрослым и самым молодым

const input = [  {    name: "John",
    age: 13,
  },
  {
    name: "Mark",
    age: 56,
  }]
const output = 43
console.log (input.age)











> Вова Кромм:
2. У тебя есть массив букв, надо посчитать каждую букву и вывести объект формата


const input = ["a", "c", "a", "d"]
const output = {
  "a": 2,
  "b": 1,
  "c": 1
}

> Вова Кромм:
3. У тебя есть массив студентовconst students = [   { name: "Alice", scores: [90, 85, 97] },
  { name: "Bob", scores: [75, 80] },
];


Тебе надо:
Вывести имя студента с лучшим средним балломВывести всех студентов со средним баллом больше 90Добавить каждому студенту средний балл

> Вова Кромм:
4. надо напистаь функцию которая принимает два (несколько) объектов и "сливает" их в единый.const a = {name: "Vasya", age: 40}const b = {lastName: "Ivanov"}
function merge(a, b){
} // return {name: "Vasya", age: 40, lastName: "Ivanov"}

> Вова Кромм:
5. У тебя есть массив продуктов с категориями:const products = [   { name: "Product 1", price: 20, category: "Electronics" },
  { name: "Product 2", price: 30, category: "Clothes" },
  { name: "Product 3", price: 40, category: "Electronics" },
  { name: "Product 4", price: 50, category: "Clothes" },
  { name: "Product 5", price: 60, category: "Clothes" },
  { name: "Product 6", price: 70, category: "Electronics" },
  { name: "Product 7", price: 80, category: "Clothes" },
  { name: "Product 8", price: 90, category: "Electronics" },
];


Тебе надо:
Вывести объект где ключ - название категории а значение количество товаров в категорииВывести объект где ключ- название категории а значение - средняя ценаВывести список всех категорий

> Вова Кромм:
Задачки из моего загашника. Они чуточку посложнее, чем были до этого, но тут может быть до 100 строчек кода, которые было бы интересно обсудить и посмотреть

> Вова Кромм:
Короче 3 части (как и в прошлый раз)

1. Проект (изменение урлов)
2. Геттеры-сеттеры (добить)
3. Теоретические задачки.
