import __md5 from '../md5.js';

describe('shared.crypto.md5', () => {
  test('Encrypt', () => {
    const res = __md5.encrypt('hello world');
    expect(res).toBe('5eb63bbbe01eeed093cb22bb8f5acdc3');
  });
  test('Decrypt', () => {
    const res = __md5.decrypt('5eb63bbbe01eeed093cb22bb8f5acdc3');
    expect(res).toBe('hello world');
  });
});
