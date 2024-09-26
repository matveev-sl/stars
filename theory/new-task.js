// Ну и чисто теоретические "задачки", их больше на синтаксис массивов, объектов, строк. 
// 1. У тебя есть массив "людей" тебе надо вернуть одно число - разницу между самым взрослым и самым молодым

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


// 2. У тебя есть массив букв, надо посчитать каждую букву и вывести объект формата


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

const students = [
{ name: "Alice", scores: [90, 85, 97] },
{ name: "Bob", scores: [75, 80] },
];

for (let i = 0; i < students.length; i++) {
students[i].scores.sort((a, b) => b - a);
let sum = students[i].scores.reduce((acc, curr) => acc + curr, 0);
let average = sum / students[i].scores.length;
students[i].average = average;
console.log(students[i].name + " средний балл " + average);
}

let bestStudent = students[0];

for (let i = 1; i < students.length; i++) {
if (students[i].average > bestStudent.average) {
  bestStudent = students[i];
}
}

console.log("Лучший студент: ", bestStudent.name, "с средним баллом:", bestStudent.average);


// if (students[0].scores[0]>students[1].scores[0]) {
//   bestStudent = students[0].name
// }
// else 
// bestStudent = students[1].name
// console.log ("Лучий студент " + bestStudent)





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

//Получаешь массив чисел и надо вернуть сумму всех положительных чисел. Например:
const input = [1, -4, 12, 0, -3, 29, -150];
let sum = 0;
for (let i=0;i<input.length;i++) {
if (input[i]>0) {
  sum = sum + input[i]
}
}
console.log(sum)

const input = [1, -4, 12, 0, -3, 29, -150];
const sum = input.reduce((acc, item) => item > 0 ? acc + item : acc)
console.log ( sum )





const products = [   
{ name: "Product 1", price: 20, category: "Electronics" },
{ name: "Product 2", price: 30, category: "Clothes" },
{ name: "Product 3", price: 40, category: "Electronics" },
{ name: "Product 4", price: 50, category: "Clothes" },
{ name: "Product 5", price: 60, category: "Clothes" },
{ name: "Product 6", price: 70, category: "Electronics" },
{ name: "Product 7", price: 80, category: "Clothes" },
{ name: "Product 8", price: 90, category: "Electronics" },
];
const count = {}
for (let i = 0; i < products.length; i++) {
; 
  count[products[i].category] = (count[products[i].category] ?? 0) + 1; 
}
console.log(count)
const totalPrice = {};
for (let i = 0; i < products.length; i++) {
const { category, price } = products[i];
if (!totalPrice[category]) 
  totalPrice[category] = 0;
}
totalPrice[category] += price;
}
console.log(totalPrice);

const averagePrice = {};
for (const category in totalPrice) {
averagePrice[category] = totalPrice[category] / count[category];
}
console.log (averagePrice)
Тебе надо:
Вывести объект где ключ - название категории а значение количество товаров в категорииВ
ывести объект где ключ- название категории а значение - средняя цена
Вывести список всех категорий

// Есть объект с названием товара как ключ и ценой как значение. Нужно увеличить все цены в 2 раза.

// JavaScript

const goods = {
meet: 100,
milk: 50
};

Object.keys(goods).forEach(key => {
goods[key] *= 2;
});

console.log(goods);

// б. у тебя осталось еще 2 задачки с прошлого раза. 
// в. ```Есть вложенный объект, где у людей есть зарплата. Нужно увеличить всем зарплату в два раза (если она есть), а если нет, то сделать ее 100.
// JavaScript

const obj = {   
 manager: {name: "Vasya", salary: 40},
 designer: {name: "Olesya", salary: 40},
 developer: {name: "Petya"}
}
const output = Object.keys(obj).(key => {
obj[key].salary !== undefined ? obj[key].salary * 2 : obj[key].salary = 100
}
)
console.log (output)


const obj = {   
manager: {name: "Vasya", salary: 40},
designer: {name: "Olesya", salary: 40},
developer: {name: "Petya"}
}

Object.entries(obj).forEach(([position, payload]) => {
const {salary, name} = payload
const salary1 = payload.salary 
})

// г. У тебя есть массив товаров. Надо из этого массива создать "массив массивов", те просто массив в котором каждый элемент это массив точно таких же товаров, но одной категории. 


// JavaScript

const exampleArray = [
{ id: 1, category: 'fruit', name: 'Apple' },
{ id: 2, category: 'fruit', name: 'Banana' },
{ id: 3, category: 'vegetable', name: 'Carrot' },
{ id: 4, category: 'vegetable', name: 'Broccoli' }
];





const output = Object.values(exampleArray.reduce((acc, item) => {
const {category} = item
const currentItems = acc[category] ?? []
return {...acc, [category]:[...currentItems, item]}

if (acc[category]) {
  acc[category].push(item)
  return acc
} 
acc[category] = [];
return acc
}, {}));
console.log (output)






const output = [
[
  { id: 1, category: 'fruit', name: 'Apple' },
  { id: 2, category: 'fruit', name: 'Banana' },
],
[
  { id: 3, category: 'vegetable', name: 'Carrot' },
  { id: 4, category: 'vegetable', name: 'Broccoli' }
],
];




// Есть два массива людей в одном хранится айди человека и его имя, в другом хранится айди человека и его отдел. Нужно создать один массив где про человека известно и имя и отдел

// JavaScript

const employees = [
{ id: 1, name: "John" },
{ id: 2, name: "Jane" }
];
const departments = [
{ id: 1, department: "Sales" },
{ id: 2, department: "Marketing" }
];
const newArr = employees.map(item => ({ ...item }));
console.log(newArr) // почему ниже получилось новый объект создать с помощью spread а тут не получилось
newArr.map (item => {
for (let j = 0; j < departments.length; j++) {
      if (item.id === departments[j].id) {
        item.department = departments[j].department;
    }
  }
})
console.log (newArr)

// for (let i = 0; i < newArr.length; i++) {
//   for (let j = 0; j < departments.length; j++) {
//     if (newArr[i].id === departments[j].id) {
//       newArr[i].department = departments[j].department;
//   }
// }
// console.log (newArr)


const products = [
{ name: "Phone", price: 699 },
{ name: "Laptop", price: 999 },
{ name: "Tablet", price: 399 }
];
const newArray = [...products]
newArray.sort((a, b) => a.price - b.price);

console.log(products);
console.log(products);

const company = {
name: "TechCorp",
employees: [
  { name: "Alice", position: "Developer" },
  { name: "Bob", position: "Manager" }
],
location: "New York"
};
const new_company = {...company, 
employees: [...company.employees]} //почему локэйшн нью йорк идет позже имплоиз?
console.log (new_company.employees)
function addNewEmploye (names, position) {
new_company.employees.push({name : names, position : position})
};

addNewEmploye ('Ivan', 'Designer')
console.log(new_company)
console.log(company)
