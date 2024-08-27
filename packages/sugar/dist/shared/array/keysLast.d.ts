/**
 * @name                keysLast
 * @namespace           shared.array
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Make sure the passed array ends with the passed keys
 *
 * @param    {Array}    array    The array to process
 * @param    {Array}    keys    The keys to end the array with
 * @return    {Array}    The processed array
 *
 * @snippet         __keysLast($1, $2)
 *
 * @example    js
 * import { __keysLast } from '@lotsof/sugar/array'
 * __keysLast(['a','b','d','g','c'], ['d','g'])
 * // ['a','b','c','d','g']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __keysLast(array: any[], keys: any[]): any[];
