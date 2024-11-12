/**
 * @name                isOdd
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if a number is odd or not
 *
 * @param    {Number}    value    The value to check
 * @return    {Boolean}    true if odd, false if not
 *
 * @todo      tests
 *
 * @snippet         __isOdd($1)
 *
 * @example    js
 * import { __isOdd } from '@lotsof/sugar/is'
 * __isOdd(1) // true
 * __isOdd(2) // false
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __isOdd(value: number): boolean {
  return value % 2 === 1;
}
