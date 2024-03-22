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
 * import { __isOdd } from '@coffeekraken/sugar/is'
 * __isOdd(1) // true
 * __isOdd(2) // false
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isOdd(value) {
    return value % 2 === 1;
}
//# sourceMappingURL=isOdd.js.map