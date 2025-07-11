/**
 * @name        isFirefox
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        stable
 *
 * Detect if is firefox
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 * @return    {Boolean}    true if is firefox, false if not
 *
 * @todo      tests
 *
 * @snippet         __isFirefox()
 *
 * @example 	js
 * import { __isFirefox } from '@blackbyte/sugar/is'
 * if (__isFirefox()) {
 *   // do something cool
 * }
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __isFirefox(ua: string = navigator.userAgent): boolean {
  return ua.indexOf('Firefox') > -1;
}
