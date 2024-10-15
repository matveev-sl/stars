function randomStringWithChance() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() < 0.7 ? resolve('Рандомная строка' + Math.random()) : reject('Ошибка: что-то пошло не так');
    }, 3000);
  });
}

async function run() {
  for (let i = 0; i < 5; i++) {
    try {
      const result = await randomStringWithChance();
      console.log(result);}
    catch (error) {
      console.error(error);
      throw new Error('random generation error')
    }
  }
}

await run();