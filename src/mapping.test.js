import { parseId } from '@/mapping.js';

describe('parseId', () => {
  test('extracts id from URL correctly', () => {
    const result = parseId('http://localhost/people/8/');
    expect(result).toEqual('8');
  });
});
