/* eslint-disable max-len */
class Character {
  constructor(name, lastname = '') {
    this.name = name;
    this.lastname = lastname;
    this.birthYear = undefined;
  }

  setAge(value) {
    this.birthYear = new Date().getFullYear() - value;
  }

  getAge() {
    return new Date().getFullYear() - this.birthYear;
  }

  isAdult() {
    return this.birthYear > 18;
  };

  getFullName () {
    let fullName = `${this.name} ${this.lastname}`;
    return fullName;
  };

  setFullName () {
    if (this.name.split(' ').lenght > 2) {
      return console.error ('Неверный формат имени');
    }
    this.lastName = this.name.split(' ')[0];
    this.name = this.name.split(' ')[1];
    console.log(this.lastName, this.name);
    return this.lastName;

  }
}

const character = new Character('Rogov Vasya');
character.setAge(35);

console.log(character.name, character.birthYear, character.getAge(), character.isAdult(), character.setFullName());

// 1. дописать геттер isAdult который возвращает тру, если человеку есть 18 лет, фолс если человеку нет 18 лет
// 2. мы хотим хранить "firstName" и "lastName" в раздельных полях, в конструкторе класса принимать два аргумента,
// где firstName обязательное, lastName опциональное и если его нет - то заполнять пустой строкой
// 3. Мы хотим сделать геттер fullName который выдает строку с полным именем человека формата "Иванов Максим"
// 4. Мы хотим сделать сеттер fullName который принимает строку в формате "Иванов Максим" и то что до пробела - пишет в фамилию,
// что после пробела - в имя. Если слово только одно - пусть пишет его в имя, если слов больше чем два - пусть выдает ошибку
// 5. Для конструктора и сеттера fullName: не важно как нам пришло имя ИВАН, иван или ИваН (то же с фамилией) мы должны сохранить Иван
// 6. (бонус) В конструкторе и сеттере fullName мы должны проверять чтобы в имени и фамилии были только печатные символы.
// Никаких точек-запятых, цифр и спецсимволов.
// 7. (бонус) Попробуй написать на это тесты.

// П.С. Чтобы проверить как это работает запускай этот файлик отдельно от проекта и выводи в консоль результат.
