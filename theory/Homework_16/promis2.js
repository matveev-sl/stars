function randomStringWithChance(successRate = 0.7) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() < successRate ? resolve(Math.random().toString(36).substring(2, 8)) : reject('Ошибка');
    }, 1000);
  });
}

const getRandomStringWithRetries = async (maxRetriesCount = 20, chance = 0.5) => {
  
  let randomString;
  let retriesCount = 0;
  while (!randomString && retriesCount < maxRetriesCount) {
    try {
      randomString = await randomStringWithChance (chance);
      console.log('randomString -', randomString);
    } catch (error) {
      console.error('Не получили randomString');
    }
    retriesCount++;
  }
  if (!randomString) {
    throw new Error ('Превышено число попыток');

  }
  return randomString;
};

const getUser3 = async () => {
  const firstNamePromise = getRandomStringWithRetries(100, 0.1);
  const lastNamePromise = getRandomStringWithRetries(100, 0.1);
  const [ firstName, lastName ] = await Promise.all([ firstNamePromise, lastNamePromise ]);
  return lastName + ' ' + firstName;
};
console.log(new Date());
console.log(await getUser3());
console.log(new Date());