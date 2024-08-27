import __aes from '../aes.js';
describe('shared.crypto.aes', () => {
    test('Encrypt', () => {
        const res = __aes.encrypt('hello world');
        expect(res).toBe('U2FsdGVkX1+dtwSOJB+97AUzzK7Wkak/sPmFqXS3Og0=');
    });
    test('Decrypt', () => {
        const res = __aes.decrypt('U2FsdGVkX1+dtwSOJB+97AUzzK7Wkak/sPmFqXS3Og0=');
        expect(res).toBe('hello world');
    });
});
//# sourceMappingURL=aes.test.js.map