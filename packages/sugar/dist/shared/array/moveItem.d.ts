/**
 * @name                moveItem
 * @namespace           shared.array
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * This function allows you to move an item to another place in the array
 *
 * @param    {Array}    array    The array to process
 * @param    {any|integer}      from        Either the element itself that you want to move, or the index of the element you want to move
 * @param    {any|integer}      to          Either the element itself where you want to move the first one, or the index of the element you want to move your element to
 * @return    {Array}    The processed array
 *
 * @snippet         __moveItem($1, $2, $3)
 *
 * @example    js
 * import { __moveItem } from '@lotsof/sugar/array';
 * const myArray = ['hello','world','something'];
 * __moveItem(myArray, 0, 1); // ['world','hello','something']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __moveItem(arr: any[], from: any | number, to: any | number): any[];
