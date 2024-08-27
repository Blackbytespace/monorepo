/**
 * @name                isObject
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if the passed value is a js object
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a object, false if not
 *
 * @todo      tests
 *
 * @snippet         __isObject($1)
 *
 * @example    js
 * import { __isObject } from '@lotsof/sugar/is'
 * if (__isObject({}) {
 *   // do something
 * }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __isObject(value: any): boolean {
  return value && typeof value === 'object' && value.constructor === Object;
}
