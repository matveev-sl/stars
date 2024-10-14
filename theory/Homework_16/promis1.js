function randomStringWithChance() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() < 0.7 ? resolve("Рандомная строка") : reject("Ошибка: что-то пошло не так");
      }, 1000);
    });
  }
  
  function run() {
    for (let i = 0; i < 5; i++) {
      randomStringWithChance()
        .then(console.log)
        .catch(console.error);
    }
  }
  
  run();