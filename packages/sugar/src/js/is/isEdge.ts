/**
 * @name        isEdge
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        stable
 *
 * Detect if is edge
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 * @return    {Boolean}    true if is edge, false if not
 *
 * @todo      tests
 *
 * @snippet         __isEdge()
 *
 * @example 	js
 * import { __isEdge } from '@blackbyte/sugar/is'
 * if (__isEdge()) {
 *   // do something cool
 * }
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __isEdge(ua: string = navigator.userAgent): boolean {
  return ua.indexOf('Edg/') > -1;
}
