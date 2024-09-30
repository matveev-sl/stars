// перевернутый массив. напиши функцию  которая принимает массив чисел (или не важно чего)

// и возвращает новый массив, где числа идут в обратном порядке.
const arr = [ 1, 2, 3, 4, 5, 6 ];

function reverseCallback (item, index, callbackArray) {
  return callbackArray[arr.length - 1 - index];
}

function fallback (arr) {
  // const copy = [ ...arr ];
  // return copy.reverse();
  // return [ ...arr.reverse() ];
  return arr.map(reverseCallback);
}
console.log(fallback(arr), arr);

const arr = [ 1, 2, 3, 4, 5, 6 ];
function fallback (arr) {
//   return arr.reverse();
  return arr.map((item, index) => arr[arr.length - 1 - index]);
}
console.log(fallback(arr));

