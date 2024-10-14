// Напишите функцию, которая находит пересечение двух массивов, возвращая только уникальные элементы, которые встречаются в обоих.

// JavaScript

function intersection(arr1, arr2) {
  return arr1.filter((item) => {
    return arr2.includes(item);
  });
}``

console.log(intersection([ 1, 2, 3, 4 ], [ 3, 4, 5, 6 ])); // [3, 4]