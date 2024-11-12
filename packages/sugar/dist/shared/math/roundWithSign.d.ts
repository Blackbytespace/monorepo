/**
 * @name            roundWithSign
 * @namespace       shared.math
 * @type            Function
 * @platform        node
 * @platform        js
 * @status          stable
 *
 * This function allows you to round a number by keeping his sign "+" or "-"
 *
 * @param       {Number}    number    The number to round
 * @return      {Number}     The rounded number
 *
 * @todo        tests
 *
 * @snippet         __roundWithSign($1)
 *
 * @example         js
 * import { __roundWithSign } from '@lotsof/sugar/math';
 * __roundWithSign(1.5); // => 1
 * __roundWithSign(-1.5); // => -1
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __roundWithSign(number: number): number;
