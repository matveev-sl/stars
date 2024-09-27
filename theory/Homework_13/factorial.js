// напиши функцию которая принимает число и возвращает его факториал. Например 5 факториал = 5*4*3*2*1
function factorial (number) {
  let result = 1;
  for (let i = 0;i <= number; i++)

    if (i - 1 !== 0) {
      result = result * i;
    } else {result = 1;}
  return result;
}
console.log(factorial(3))