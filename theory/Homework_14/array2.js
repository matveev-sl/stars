// 7. Напиши функцию, которая принимает массив объектов и возвращает объект, 
// в котором ключи — это имена свойств, а значения — количество объектов, имеющих это свойство.

const users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 25 },
    { name: "David", height: 178},
];
function countProperties(arr) {
    return arr.reduce((acc, obj) => {
        for (const key in obj) {
            if (!acc[key]) {
                acc[key] = 0;
            }
            acc[key]++;
        }
        return acc; 
    }, {});
}
console.log(countProperties(users)); // { name: 4, age: 3, height: 1 }
