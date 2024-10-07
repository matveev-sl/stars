// Работа с датами. Напиши функцию, которая принимает дату и возвращает день недели.
function getDayOfWeek(dateString) {
  const daysOfWeek = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
  const date = new Date(dateString);
  const dayIndex = date.getDay();
  return daysOfWeek[dayIndex];
}

console.log(getDayOfWeek('2024-10-01'));