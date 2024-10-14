function randomStringWithChance(successRate = 0.7) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() < successRate ? resolve(Math.random().toString(36).substring(2, 8)) : reject("Ошибка");
      }, 1000);
    });
  }
  
  async function getUser() {
    let firstName, lastName;
  
    const firstNamePromise = (async () => {
      while (!firstName) {
        try {
          firstName = await randomStringWithChance();
        } catch (error) {
          console.error("Ошибка при получении имени:", error);
        }
      }
    })();
  
    const lastNamePromise = (async () => {
      while (!lastName) {
        try {
          lastName = await randomStringWithChance();
        } catch (error) {
          console.error("Ошибка при получении фамилии:", error);
        }
      }
    })();
  
    await Promise.all([firstNamePromise, lastNamePromise]);
  
    return { firstName, lastName };
  }
  
  getUser().then(user => console.log("Пользователь:", user));
  