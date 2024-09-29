// напиши функцию которая принимает число и возвращает его факториал. Например 5 факториал = 5*4*3*2*1
function factorial (number) {
  let result = 1;
  for (let i = 0;i <= number; i++)

    if (i - 1 !== 0) {
      result = result * i;
    } else {result = 1;}
  return result;
}
console.log(factorial(3));

function factorial2 (number) {
  if (number === 1) return 1;
  return factorial2(number - 1) * number;
}

console.log(factorial2(10_000));
