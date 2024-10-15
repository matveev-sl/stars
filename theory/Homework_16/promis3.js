function randomStringWithChance(successRate = 0.7) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() < successRate ? resolve(Math.random().toString(36).substring(2, 8)) : reject('Ошибка');
    }, 1000);
  });
}

async function getUser() {
  let firstName, lastName;

  const firstNamePromises = Array.from({ length: 10 }, () => randomStringWithChance());
  const lastNamePromises = Array.from({ length: 10 }, () => randomStringWithChance());

  try {
    const firstNameResults = await Promise.allSettled(firstNamePromises);
    const lastNameResults = await Promise.allSettled(lastNamePromises);

    firstNameResults.forEach(result => {
      if (result.status === 'fulfilled') {
        firstName = result.value;
      }
    });

    lastNameResults.forEach(result => {
      if (result.status === 'fulfilled') {
        lastName = result.value;
      }
    });
  } catch (error) {
    console.error('Ошибка при получении имени или фамилии:', error);
  }

  if (!firstName || !lastName) {
    throw new Error('Не удалось получить валидные имя или фамилию.');
  }

  return { firstName, lastName };
}

getUser().then(user => console.log('Пользователь:', user)).catch(error => console.error('Ошибка:', error));
