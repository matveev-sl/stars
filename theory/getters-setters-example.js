/* eslint-disable max-len */
export class Character {
  constructor(name, lastname = '') {
    this.name = name;
    this.lastName = lastname;
    this.birthYear = undefined;
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
  setFullName () {
    if (this.name.split(' ').length > 2) {
      throw new Error('Имя не должно содержать более двух слов');
    }
    let lastName = this.name.split(' ')[1];
    let firstName = this.name.split(' ')[0] ?? '';
    
    const filter = /[^a-zа-яё\s]+/gi;
    firstName= firstName.replace(filter, '').toLowerCase(); 
    firstName = firstName[0].toUpperCase() + firstName.slice(1);
    lastName = lastName.replace(filter, '').toLowerCase();
    lastName = lastName[0].toUpperCase() + lastName.slice(1);
    this.lastName = lastName
    this.firstName = firstName
  }

  getFullName () {
    return this.lastName + ' ' + this.firstName

  };

  
}

const character = new Character('va#$4ya r$%^ogov');
character.setAge(35);
character.setFullName;

 console.log ( character.getFullName(), character.isAdult())

// console.log(character.name, character.birthYear, character.getAge(), character.isAdult(), character.setFullName());

