// Теория4. Напиши функцию, которая возвращает сумму всех цифр числа.

function sumOfNumbers (num) {
  num = String(num).split('');
  return num.reduce((acc, item) => acc + Number(item), 0);
}
console.log(sumOfNumbers(162));

// быстрее и "логичнее", так как нет странных преобразований в строку и обратно
function sumOfNumbers2(num) {
  let sum = 0;

  while (num > 0) {
    sum += num % 10; // добавляем последнюю цифру к сумме
    num = Math.floor(num / 10); // удаляем последнюю цифру
  }

  return sum;
}
console.log(sumOfNumbers2(162));
