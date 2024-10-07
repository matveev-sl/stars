function reverseArray(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    let temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    // [ arr[left], arr[right] ] = [ arr[right], arr[left] ];

    left++;
    right--;
  }
  return arr;
}
