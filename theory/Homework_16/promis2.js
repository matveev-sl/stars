function randomStringWithChance(successRate = 0.7) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() < successRate ? resolve(Math.random().toString(36).substring(2, 8)) : reject('Ошибка');
    }, 1000);
  });
}

// async function getUser2() {

//   let firstName;
//   let retriesCount = 0;
//   while (!firstName && retriesCount < 5) {
//     try {
//       firstName = await randomStringWithChance (0.0001);
//       console.log('Firstname -', firstName);
//     } catch (error) {
//       console.error('Не получили firstName');
//     }
//     retriesCount++;
//   }
//   if (!firstName) {
//     firstName = 'Матвеев';
//   }

//   let lastName;
//   for (let retry = 0; retry < 5; retry++) {
//     lastName = await randomStringWithChance (0.3) .catch((error) => {
//       console.log('Ошибка фамилии', error);
//     });
//     console.log('Lastname -', lastName);
//     if (lastName) break;
//   }
//   if(!lastName) throw new Error ('Не получилось подобрать с 5 раза ластнейм');
//   return lastName + ' ' + firstName;
// }

// getUser2().then(user => console.log('Пользователь:', user));
const getRandomStringWithRetries = async (maxRetriesCount = 5, chance = 0.5) => {

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
  const firstNamePromise = getRandomStringWithRetries(5, 0.99);
  const lastNamePromise = getRandomStringWithRetries(100, 0.91);
  const [ firstName, lastName ] = await Promise.all([ firstNamePromise, lastNamePromise ]);
  return lastName + ' ' + firstName;
};
console.log(new Date());
console.log(await getUser3());
console.log(new Date());