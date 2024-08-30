import { parseId } from '@/mapping.js';

describe('Unit tests for pure parseId function', () => {

  test('extracts id from URL correctly', () => {
    const result = parseId('http://localhost/people/8/');
    expect(result).toEqual('8');
  });

  test('extracts two digits id from URL correctly', () => {
    const result = parseId('http://localhost/people/89/');
    expect(result).toEqual('89');
  });

  test('extracts two digits id from URL correctly', () => {
    const result = parseId('http://localhost/people/123/');
    expect(result).toEqual('123');
  });

  test('extracts two digits id from URL correctly', () => {
    const result = parseId('http://localhost/people/0/');
    expect(result).toEqual('0');
  });

  test('extracts two digits id from URL correctly', () => {
    const result = parseId('http://localhost/people/11/22');
    expect(result).toEqual('11');
  });

  test('extracts two digits id from URL correctly', () => {
    expect(
      () => parseId('http://localhost/films/8/')
    ).toThrow('Id was not parsed');
  });

});
