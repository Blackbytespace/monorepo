/**
 * @name            sha256
 * @namespace       shared.crypto
 * @type            Object
 * @platform        node
 * @status          stable
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the sha256 algorithm
 *
 * @snippet         __sha256.encrypt($1)
 *
 * @example         js
 * import { __sha256 } from '@lotsof/sugar/crypto';
 * __sha256.encrypt('hello world');
 *
 * @todo        tests
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
declare const _default: {
    /**
     * @name        encrypt
     * @type          Function
     *
     * Encrypt
     *
     * @param       {String}      message         The message to encrypt
     * @return      {String}                      The encrypted string
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
     */
    encrypt: (message: any) => any;
    /**
     * @name        decrypt
     * @type        Function
     *
     * Decrypt
     *
     * @param       {String}        message         The message to decrypt
     * @return      {String}                        The decrypted message
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
     */
    decrypt: (message: any) => any;
};
export default _default;
