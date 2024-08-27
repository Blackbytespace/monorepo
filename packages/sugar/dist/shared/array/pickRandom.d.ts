/**
 * @name                pickRandom
 * @namespace           shared.array
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Pick a random item in the passed array
 *
 * @param       {Array}         array       The array from which to pick a random item
 * @return      {Any}                       A random array item
 *
 * @snippet         __pickRandom($1)
 *
 * @example         js
 * import { __pickRandom } from '@lotsof/sugar/array';
 * const array = ['hello','world'];
 * __pickRandom(array); // => 'world'
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __pickRandom(array: any[], count?: number): any;
