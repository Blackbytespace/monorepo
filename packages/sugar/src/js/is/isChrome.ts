/**
 * @name        isChrome
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        stable
 *
 * Detect if is chrome
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 * @return    {Boolean}    true if is chrome, false if not
 *
 * @todo      tests
 *
 * @snippet         __isChrome()
 *
 * @example 	js
 * import { __isChrome } from '@blackbyte/sugar/is'
 * if ( __isChrome()) {
 *   // do something cool
 * }
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __isChrome(ua: string = navigator.userAgent): boolean {
  return ua.indexOf('Chrome') > -1;
}
