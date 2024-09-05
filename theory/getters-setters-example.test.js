import { Character } from './getters-setters-example.js';

describe('Character class', () => {
  test('check correct name and last name', () => {
    const result = new Character('rog;ov vasy%%a');
    expect(result.getFullName()).toEqual('Rogov Vasya');
  });

  test('check correct name and last name', () => {
    const result = new Character('rog;ov');
    expect(result).toEqual('Rogov');
  });

  test('check correct name and last name', () => {
    const result = new Character('rog;ov Vasya');
    expect(result).toEqual('Rogov Vasya');
  });

});
