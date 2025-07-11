/**
 * @name                isString
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if the passed value is a js String
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a String, false if not
 *
 * @todo      tests
 *
 * @snippet         __isString($1)
 *
 * @example    js
 * import { __isString } from '@blackbyte/sugar/is'
 * if (__isString({}) {
 *   // do something
 * }
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __isString(value: any): boolean {
  return typeof value === 'string' || value instanceof String;
}
