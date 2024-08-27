/**
 * @name          mapToObject
 * @namespace            shared.convert
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        stable
 *
 * This function simply take a Map object and convert it to a plain object
 *
 * @param       {Map}         map       The map object to convert into object
 * @return      {Object}                The plain object
 *
 * @snippet         __mapToObject($1)
 *
 * @example       js
 * import { __mapToObject } from '@lotsof/sugar/convert';
 * const myMap = new Map();
 * myMap.set('hello', 'world');
 * __mapToObject(myMap);
 * // {
 * //   hello: 'world'
 * // }
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __mapToObject(map: any): any;
