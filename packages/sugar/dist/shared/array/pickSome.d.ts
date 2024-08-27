/**
 * @name            pickSome
 * @namespace       shared.array
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * This returns you one or more random item of the passed array
 *
 * @param       {Any[]}         array          The array in which you want to pick a random item
 * @param       {Number}       [$min=1]        The minimum number of items to pick
 * @param       {Number}       [$max=null]        The maximum number of items to pick
 * @return      {Any}                         The random array item(s)
 *
 * @snippet         __pickSome($1,$2,$3);
 *
 * @example         ts
 * import { __pickSome } from '@lotsof/sugar/array':
 * __pickSome(['hello','world','test'], 1, 2);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __pickSome(array: any[], min?: number, max?: number): any[];
