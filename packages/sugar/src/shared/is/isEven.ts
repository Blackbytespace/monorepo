/**
 * @name                isEven
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if a number is even or not
 *
 * @param    {Number}    value    The value to check
 * @return    {Boolean}    true if even, false if not
 *
 * @todo      tests
 *
 * @snippet         isEven($1)
 *
 * @example    js
 * import { __isEven } from '@blackbyte/sugar/is'
 * __isEven(1) // false
 * __isEven(2) // true
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __isEven(value: number): boolean {
  return value % 2 === 0;
}
