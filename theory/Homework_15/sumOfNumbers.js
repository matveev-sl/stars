// Теория4. Напиши функцию, которая возвращает сумму всех цифр числа.

function sumOfNumbers (num) {
  num = String(num).split('');
  return num.reduce((acc, item) => acc + Number(item), 0);
}
console.log(sumOfNumbers(162));