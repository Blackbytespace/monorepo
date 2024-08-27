/**
 * @name                toBase
 * @namespace           shared.number
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Convert a number to another base between 1 and the length of the "chars" settings
 *
 * @param       {Number}        number      The number to convert
 * @param       {Number}        base         The base to convert to
 * @return      {String}                    The converted number in string format
 *
 * @setting         {String}        [chars='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789']          The characters set to use for conversion
 *
 * @todo      tests
 *
 * @snippet         __toBase($1, $2)
 *
 * @example    js
 * import { __toBase } from '@lotsof/sugar/number'
 * __toBase(1024, 62); // qF
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export type TToBaseSettings = {
    chars: string;
};
export default function __toBase(num: number, base: number, settings?: TToBaseSettings): string;
