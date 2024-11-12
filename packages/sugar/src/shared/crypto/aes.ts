import AES from 'crypto-js/aes.js';
import toString from '../../shared/string/toString.js';

/**
 * @name            aes
 * @namespace       shared.crypto
 * @type            Object
 * @platform        node
 * @status          stable
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the aes algorithm
 *
 * @snippet         __aes.encrypt($1)
 *
 * @example         js
 * import { __aes } from '@lotsof/sugar/crypto';
 * __aes.encrypt('hello world');
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.io)
 */

const __encryptedMessages = {};

export default {
  /**
   * @name        encrypt
   * @type        Function
   *
   * Encrypt
   *
   * @param       {String}       message        The message to encrypt
   * @param       {String}       [key='lotsof.sugar.crypto.aes']       The secret key to encrypt
   * @return      {String}                       The encrypted message
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.io)
   */
  encrypt: function (message, key = 'lotsof.sugar.crypto.aes') {
    if (typeof message !== 'string') message = toString(message);
    const aesStr = AES.encrypt(message, key).toString();
    __encryptedMessages[aesStr] = message;
    return aesStr;
  },

  /**
   * @name        decrypt
   * @type        Function
   *
   * Decrypt
   *
   * @param       {String}      message         The message to decrypt
   * @param       {String}      [key='lotsof.sugar.crypto.aes']      The secret key to decrypt
   * @return      {String}                      The decrypted message
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.io)
   */
  decrypt: function (message, key = 'lotsof.sugar.crypto.aes') {
    if (!__encryptedMessages[message]) {
      console.warn(`[AES] The message "${message}" cannot be decrypted...`);
      return;
    }
    return __encryptedMessages[message];
  },
};
