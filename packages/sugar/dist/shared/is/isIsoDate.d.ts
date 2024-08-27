/**
 * @name                isIsoDate
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if the passed value is a valid iso date string
 *
 * @param 		{Mixed} 		value 		The value to check
 * @return 		{Boolean} 					The check result
 *
 * @todo      tests
 *
 * @snippet         __isIsoDate($1)
 *
 * @example 	js
 * import { __isIsoDate } from '@lotsof/sugar/is';
 * __isIsoDate('john.doe@gmail.com') => false
 * __isIsoDate('plop@yop.com') => false
 * __isIsoDate('hello') => false
 * __isIsoDate('2008-08') => true
 *
 * @see             https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s07.html
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __isIsoDate(value: string): boolean;
