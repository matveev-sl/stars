const date = new Date("2024-10-02 9:00:00Z");
function addDays (date, numbers) {
    const result = new Date(date);
    console.log(result)
    result.setHours(result.getHours() + numbers);
    return result;
}
const newDate = addDays(date, 10); 
console.log (newDate)