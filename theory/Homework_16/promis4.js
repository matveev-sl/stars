function randomStringWithChance(successRate = 0.7) {
    return new Promise((resolve, reject) => {
      const delay = Math.floor(Math.random() * (1500 - 500 + 1)) + 500;
      setTimeout(() => {
        Math.random() < successRate ? resolve(Math.random().toString(36).substring(2, 8)) : reject("Ошибка");
      }, delay);
    });
  }
  
  async function getUser() {
    let firstName, lastName;
  
    const firstNamePromises = Array.from({ length: 5 }, () => randomStringWithChance());
    const lastNamePromises = Array.from({ length: 5 }, () => randomStringWithChance());
  
    const firstNameResults = Promise.race(firstNamePromises);
    const lastNameResults = Promise.race(lastNamePromises);
  
    try {
      firstName = await firstNameResults;
    } catch (error) {
      console.error("Ошибка при получении имени:", error);
    }
  
    try {
      lastName = await lastNameResults;
    } catch (error) {
      console.error("Ошибка при получении фамилии:", error);
    }
  
    if (!firstName || !lastName) {
      throw new Error("Не удалось получить валидные имя или фамилию.");
    }
  
    return { firstName, lastName };
  }
  
  getUser().then(user => console.log("Пользователь:", user)).catch(error => console.error("Ошибка:", error));
  