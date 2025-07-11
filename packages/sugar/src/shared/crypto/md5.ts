import __md5 from 'crypto-js/md5.js';
import parse from '../../shared/string/parse.js';
import toString from '../../shared/string/toString.js';

const __encryptedMessages: any = {};

/**
 * @name              md5
 * @namespace         shared.crypto
 * @type              Object
 * @platform          js
 * @status            stable
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the md5 algorithm
 *
 * @snippet         __md5.encrypt($1)
 *
 * @example         js
 * import { __md5 } from '@blackbyte/sugar/crypto';
 * __md5.encrypt('hello world');
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
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
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
   */
  encrypt: function (message: any): string {
    if (typeof message !== 'string') message = toString(message);
    const md5Str = __md5(message).toString();
    __encryptedMessages[md5Str] = message;
    return md5Str;
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
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
   */
  decrypt: function (message: string): any {
    if (!__encryptedMessages[message]) {
      console.warn(`The message "${message}" cannot be decrypted...`);
      return;
    }
    const string = __encryptedMessages[message];
    delete __encryptedMessages[message];
    return parse(string);
  },
};
