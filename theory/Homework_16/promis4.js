function randomStringWithChance(successRate = 0.7) {
  const randomDelay = Math.floor(Math.random() * (1500 - 500 + 1)) + 500; 
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() < successRate
        ? resolve(Math.random().toString(36).substring(2, 8))
        : reject('Ошибка');
    }, randomDelay);
  });
}

const getRandomStringWithRetries = async (maxPromisesCount = 5, chance = 0.5) => {
  const promises = Array.from({ length: maxPromisesCount }, () => randomStringWithChance(chance));
  try {
    return await Promise.any(promises);
  } catch (error) {
    throw new Error('Не удалось получить строку');
  }
};

const getUser3 = async () => {
  try {
    const firstNamePromise = getRandomStringWithRetries(5, 0.7); // Имя с вероятностью успеха 0.7
    const lastNamePromise = getRandomStringWithRetries(5, 0.9); // Фамилия с вероятностью успеха 0.9

    const [firstName, lastName] = await Promise.all([firstNamePromise, lastNamePromise]);
    return `${lastName} ${firstName}`; 
  } catch (error) {
    console.error('Ошибка при получении имени пользователя:', error.message);
    return 'Не удалось получить имя пользователя';
  }
};

console.log(new Date());
getUser3().then(user => {
  console.log(user);
  console.log(new Date());
});
