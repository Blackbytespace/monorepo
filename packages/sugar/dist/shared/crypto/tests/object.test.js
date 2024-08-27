import __object from '../object.js';
describe('shared.crypto.object', () => {
    test('Encrypt', () => {
        const res = __object.encrypt({
            hello: 'world',
        });
        expect(res).toBe('eImsbxJncdIkZWy0ovnx6Iy');
    });
    test('Decrypt', () => {
        const res = __object.decrypt('eImsbxJncdIkZWy0ovnx6Iy');
        expect(res).toEqual({
            hello: 'world',
        });
    });
});
//# sourceMappingURL=object.test.js.map