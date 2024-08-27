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
 * import { __isEmail } from '@lotsof/sugar/is';
 * __isEmail('john.doe@gmail.com') => true
 * __isEmail('plop@yop.com') => true
 * __isEmail('hello') => false
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __isEmail(value: string): boolean;
