/**
 * @name                isRegexp
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if the passed value is a js Regexp
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Regexp}   true if it's a Regexp, false if not
 *
 * @todo      tests
 *
 * @snippet         __isRegex($1)
 *
 * @example    js
 * import { __isRegex } from '@blackbyte/sugar/is'
 * if (__isRegex(/^hello$/g) {
 *   // do something
 * }
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __isRegex(value: any): boolean {
  return value && typeof value === 'object' && value.constructor === RegExp;
}
