// напиши функцию, которая принимает строку и возвращает тру, если строка - полиндром, фалс если иначе.
function polindrom (word) {
  for (let idx = 0; idx <= word.length / 2; idx++) {
    const oppositeIdx = word.length - 1 - idx;
    if (word[idx] !== word[oppositeIdx]) {
      // console.log ('Неполиндром');
      return false;
    }
  }
  return true;
  // console.log ('Полиндром');
}
polindrom ('каккак');
polindrom ('костек');
