// напиши функцию, которая принимает строку и возвращает тру, если строка - полиндром, фалс если иначе.
function polindrom (word) {
  for (let i = 0; i <= word.length / 2;i++) {
    if (word[i] !== word[word.length - 1 - i]) {
      console.log ('Неполиндром');
      return;
    }
  }
  console.log ('Полиндром');
}
polindrom ('каккак');
polindrom ('костек');
