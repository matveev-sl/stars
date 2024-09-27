// простая задачка - написать функцию, которая принимает массив и возвращает новый массив
//  где представлены только четные числа из входящего массива

const arr = [1,2,3,4,5,6]
function numbers (arr) {
return arr.filter(item => {
   if (item % 2 === 0) {
   return item
   } 
})}
console.log(numbers(arr))