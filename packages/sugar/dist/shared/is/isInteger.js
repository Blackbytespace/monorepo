/**
 * @name                isInteger
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if the passed value is an integer
 *
 * @param 		{Mixed} 		value 		The value to check
 * @return 		{Boolean} 					The check result
 *
 * @todo      tests
 *
 * @snippet         __isInteger($1)
 *
 * @example 	js
 * import { __isInteger } from '@lotsof/sugar/is';
 * __isInteger(10) => true
 * __isInteger('hello') => false
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __isInteger(data) {
    return (typeof data === 'number' &&
        !isNaN(data) &&
        (function (x) {
            return (x | 0) === x;
            // @ts-ignore
        })(parseFloat(data)));
}
//# sourceMappingURL=isInteger.js.map