/* eslint-disable max-len */
export class Character {
  constructor(name, lastname = '') {
    this.name = Character.filterName(name);
    this.lastName = Character.filterName(lastname);
    this.birthYear = undefined;
  }
  static filterName (value) {
    const filter = /[^a-zа-яё\s]+/gi;
    value = value.replace(filter, '').toLowerCase(); 
    if (value.length === 0) {
      return '';
    }
    value = value[0].toUpperCase() + value.slice(1);
    
    return value
  }

  setAge(value) {
    this.birthYear = new Date().getFullYear() - value;
  }

  getAge() {
    return new Date().getFullYear() - this.birthYear;
  }

  isAdult() {
    return this.getAge() >= 18;
  };
  setFullName (value) {
    if (value.split(' ').length > 2) {
      throw new Error('Имя не должно содержать более двух слов');
    }
    let lastName = value.split(' ')[1];
    let firstName = value.split(' ')[0] ?? '';
    this.lastName = lastName
    this.firstName = firstName
  }
  

  getFullName () {
    return this.lastName + ' ' + this.firstName

  };

  
}

const character = new Character('va#$4ya r$%^ogov');
character.setAge(35);
character.setFullName(character.name);

 console.log ( character.getFullName(), character.isAdult())

// console.log(character.name, character.birthYear, character.getAge(), character.isAdult(), character.setFullName());

