// 3. Напишите функцию, которая проверяет, все ли элементы массива уникальны.
function unique(arr) {
    const uniqueEl = arr.reduce((acc, current) => {
        if (!acc.includes(current)) { 
            acc.push(current); 
        }
        return acc;
    }, []); 
    return uniqueEl.length === arr.length; 
}

// Пример использования
console.log(unique([1, 2, 3, 4])); // true
console.log(unique([1, 2, 2, 4])); // false



function unique(arr) {
    const uniqueEl = new Set(arr); 
    return uniqueEl.size === arr.length; 
}

// Пример использования
console.log(unique([1, 2, 3, 4])); // true
console.log(unique([1, 2, 2, 4])); // false