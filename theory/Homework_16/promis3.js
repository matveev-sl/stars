function randomStringWithChance(successRate = 0.7) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() < successRate ? resolve(Math.random().toString(36).substring(2, 8)) : reject('Ошибка');
      }, 1000);
    });
  }
  
  const getRandomStringWithRetries = async (maxRetriesCount = 20, chance = 0.5) => {
    const promises = Array.from({ length: maxRetriesCount}, () => randomStringWithChance(chance));
    try {
        return await Promise.any(promises); 
      } catch (error) {
        throw new Error('Не удалось получить строку');
      }
  };
  
  const getUser3 = async () => {
    try {
    const firstNamePromise = getRandomStringWithRetries(100, 0.1);
    const lastNamePromise = getRandomStringWithRetries(100, 0.1);
    const [ firstName, lastName ] = await Promise.all([ firstNamePromise, lastNamePromise ]);
    return lastName + ' ' + firstName;
    } catch (error) {
        console.error('Ошибка при получении имени пользователя:', error.message);
        return 'Не удалось получить имя пользователя';
    }
  };
  console.log(new Date());
  console.log(await getUser3());
  console.log(new Date());