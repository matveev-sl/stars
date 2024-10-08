// // Напиши функцию, которая порядковый номер и выдает число фибоначи по этому номеру. Первое число фибоначи - это ноль, второе - единица, третье - сумма
//  первого и второго (единица), четвертое - сумма второго и третьего (двойка) и так далее.
function fibonacci(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const cache = {};

function fibonacci2(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  if (cache[n]) return cache[n];
  cache[n] = fibonacci2(n - 1) + fibonacci2(n - 2);
  return cache[n];
}

const now = Date.now();
console.log(fibonacci(40));
console.log('Execution1', Date.now() - now);

const now1 = Date.now();
console.log(fibonacci2(40));
console.log('Execution2', Date.now() - now1);
