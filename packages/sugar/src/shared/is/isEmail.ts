/**
 * @name                isEmail
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if the passed value is a valid email address
 *
 * @param 		{Mixed} 		value 		The value to check
 * @return 		{Boolean} 					The check result
 *
 * @todo      tests
 *
 * @snippet         __isEmail($1)
 *
 * @example 	js
 * import { __isEmail } from '@blackbyte/sugar/is';
 * __isEmail('john.doe@gmail.com') => true
 * __isEmail('plop@yop.com') => true
 * __isEmail('hello') => false
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __isEmail(value: string): boolean {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value.toLowerCase());
}
