// @ts-ignore
import sha256 from 'crypto-js/sha256.js';
import parse from '../../shared/string/parse.js';
import toString from '../../shared/string/toString.js';

const __encryptedMessages = {};

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
export default {
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
  encrypt: function (message) {
    if (typeof message !== 'string') message = toString(message);
    const string = sha256(message).toString();
    __encryptedMessages[string] = message;
    return string;
  },

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
  decrypt: function (message) {
    if (!__encryptedMessages[message]) {
      console.warn(`[SHA256] The message "${message}" cannot be decrypted...`);
      return;
    }
    const string = __encryptedMessages[message];
    delete __encryptedMessages[message];
    return parse(string);
  },
};
