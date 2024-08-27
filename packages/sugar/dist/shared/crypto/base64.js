import toString from '../../shared/string/toString.js';
import __base64 from 'crypto-js/enc-base64.js';
import __encUtf8 from 'crypto-js/enc-utf8.js';
/**
 * @name            base64
 * @namespace       shared.crypto
 * @type            Object
 * @platform        js
 * @status          stable
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the base64 algorithm
 *
 * @snippet         __base64.encrypt($1)
 *
 * @example         js
 * import { __base64 } from '@lotsof/sugar/crypto';
 * __base64.encrypt('hello world');
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default {
    /**
     * @name        encrypt
     * @type        Function
     *
     * Encrypt
     *
     * @param       {String}       message        The message to encrypt
     * @return      {String}                       The encrypted message
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
     */
    encrypt: function (message) {
        if (typeof message !== 'string')
            message = toString(message);
        return __base64.stringify(__encUtf8.parse(message));
    },
    /**
     * @name        decrypt
     * @type        Function
     *
     * Decrypt
     *
     * @param       {String}      message         The message to decrypt
     * @return      {String}                      The decrypted message
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
     */
    decrypt: function (message) {
        if (typeof message !== 'string')
            message = toString(message);
        return __base64.parse(message).toString(__encUtf8);
    },
};
//# sourceMappingURL=base64.js.map