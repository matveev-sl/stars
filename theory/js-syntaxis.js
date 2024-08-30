/* eslint-disable max-len */

// Это задачки на методы map, filter, reduce...
const string = 'hello my name is petya';
const array = string.split(' ');
let resul = array.map((elem) => elem[0].toUpperCase() + elem.slice(1));
resul = resul.join(' ');
console.log(resul);

let string1 = 'abc';
function plusString (x) {
  let result = '';
  for (let i = 0; i < x; i++) {
    result = result + string1;
  }
  return result;
}
console.log(plusString (3));

let array2 = [ 2, 5, 29 ];
let result = array2.reduce((acc, elem) => acc + elem);
console.log (result);

let array3 = [ 2, 5, 29 ];
let result1 = array3.map((elem) => elem * elem);
console.log (result1);

// 1. есть строка "hello my name is petya", надо чтобы каждое слово начиналось с большой буквы: "Hello My Name Is Petya"
// 2. есть строка "abc" надо умножить ее на число Х, формата "abcabcabc..." Х раз
// 3. есть массив чисел [2,5,29] нужно посчитать сумму всех чисел
// 4. есть массив чисел [2,5,29] нужно сделать массив где все числа возведены в квадрат
