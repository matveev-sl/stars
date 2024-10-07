function mergeSortedArrays (arr1, arr2) {
  const result = [];
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] > arr2[j]) {
        result.push(arr1[i]);
      }
      else {result.push(arr2[j]);
      }
    }
  }
  return result;
//   const result = arr1.concat(arr2);
//   return result.sort((a, b) => a - b);
}
console.log(mergeSortedArrays([ 10, 20, 30 ], [ 5, 15, 25 ]));

// Ожидаемый результат: [1, 2, 3, 4, 5, 6]
