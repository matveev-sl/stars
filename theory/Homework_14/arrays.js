// 6. Массивы
// Напиши функцию, которая удаляет из массива дубликаты (по айди). Оставлять будем только первый (по порядку).
// JavaScript

const users = [
    { name: "Alice", age: 25, id: 1 },
    { name: "Bob", age: 30, id: 2 },
    { name: "Max", age: 35, id: 1 },
];

function deleteDoble (arr){
    return arr.reduce((acc, item) => {
        
        if (!acc.some(newitem => newitem.id === item.id)) {
            acc.push(item); 
        }
        return acc; 
    }, []);
}
