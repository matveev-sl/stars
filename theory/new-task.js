
Ну и чисто теоретические "задачки", их больше на синтаксис массивов, объектов, строк. 

1. У тебя есть массив "людей" тебе надо вернуть одно число - разницу между самым взрослым и самым молодым

const input = [  {    name: "John",
    age: 13,
  },
  {
    name: "Mark",
    age: 56,
  }]


const bigesstNumber = input.sort((a, b) => b.age - a.age)
const output = bigesstNumber[0].age - bigesstNumber[1].age
console.log (output)


2. У тебя есть массив букв, надо посчитать каждую букву и вывести объект формата


const input = ["a", "c", "a", "d"]
const letterCount = {};

input.forEach(letter => {
  letterCount[letter] = (letterCount[letter] || 0) + 1;
});
const result = Object.keys(letterCount).map(letter => {
  return { Буква: letter, Счет: letterCount[letter] };
});
console.log(result);

// 3. У тебя есть массив студентов

const students = [   { name: "Alice", scores: [90, 85, 97]},
  { name: "Bob", scores: [75, 80] },
];
for (let i = 0; i < students.length; i++) {
students[i].scores.sort((a, b) => b - a)
let sum = {}
  sum = students[i].scores.reduce((acc, curr) => (acc + curr), 0);
  let average = sum/students[i].scores.length
  console.log (students[i].name + " средний бал " + average)
  let goodStudents = ''
  if (average > 90) {
    console.log (students[i].name + " хороший студент")
  }

}
let bestStudent = ''
if (students[0].scores[0]>students[1].scores[0]) {
  bestStudent = students[0].name
}
else 
bestStudent = students[1].name
console.log ("Лучий студент " + bestStudent)





// Тебе надо:
// Вывести имя студента с лучшим средним балломВывести всех студентов со средним баллом больше 90Добавить каждому студенту средний балл

// > Вова Кромм:
// 4. надо напистаь функцию которая принимает два (несколько) объектов и "сливает" их в единый.

const a = {name: "Vasya", age: 40} 
const b = {lastName: "Ivanov"}
function merge(a, b){

const res = {...a, ...b}
return res
} 

const obj = merge(a,b)
console.log (obj)
// return {name: "Vasya", age: 40, lastName: "Ivanov"}
// > Вова Кромм:
// 5. У тебя есть массив продуктов с категориями:

const products = [   { name: "Product 1", price: 20, category: "Electronics" },
  { name: "Product 2", price: 30, category: "Clothes" },
  { name: "Product 3", price: 40, category: "Electronics" },
  { name: "Product 4", price: 50, category: "Clothes" },
  { name: "Product 5", price: 60, category: "Clothes" },
  { name: "Product 6", price: 70, category: "Electronics" },
  { name: "Product 7", price: 80, category: "Clothes" },
  { name: "Product 8", price: 90, category: "Electronics" },
];
const names = {}
for (let i = 0; i < products[i].category.length; i++)
{
  console.log (products[i].category)
}
Тебе надо:
Вывести объект где ключ - название категории а значение количество товаров в категорииВ
ывести объект где ключ- название категории а значение - средняя цена
Вывести список всех категорий

> Вова Кромм:
Задачки из моего загашника. Они чуточку посложнее, чем были до этого, но тут может быть до 100 строчек кода, которые было бы интересно обсудить и посмотреть

> Вова Кромм:
Короче 3 части (как и в прошлый раз)

1. Проект (изменение урлов)
2. Геттеры-сеттеры (добить)
3. Теоретические задачки.
