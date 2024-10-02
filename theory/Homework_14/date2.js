// 4. Работа с датами. Напишите функцию, которая принимает дату и количество дней, которые нужно добавить, и возвращает новую дату.
// JavaScript

const date = new Date("2024-10-02");
function addDays (date, numbers) {
    const result = new Date(date);
    result.setDate(result.getDate() + numbers);
    return result;
}
const newDate = addDays(date, 10); 
console.log (newDate)