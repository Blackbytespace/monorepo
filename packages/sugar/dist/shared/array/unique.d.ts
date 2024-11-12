/**
 * @name                unique
 * @namespace           shared.array
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * This function simply take an array as parameter and return a new one
 * with all the duplicates values removed.
 *
 * @param         {Array}         array               The array to deduplicates
 * @return        {Array}                             The deduplicated array
 *
 * @snippet         __unique($1)
 *
 * @example         js
 * import { __unique } from '@lotsof/sugar/array';
 * __unique(['hello','world','hello','world']); // => ['hello','world']
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __unique(array: any[]): any[];
