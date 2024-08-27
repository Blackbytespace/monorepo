/**
 * @name        isSafari
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        stable
 *
 * Detect if is safari
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 * @return    {Boolean}    true if is safari, false if not
 *
 * @todo      tests
 *
 * @snippet         __isSafari()
 *
 * @example 	js
 * import { __isSafari } from '@lotsof/sugar/is'
 * if (__isSafari()) {
 *   // do something cool
 * }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __isSafari(ua: string = navigator.userAgent): boolean {
  return ua.indexOf('Safari') != -1 && ua.indexOf('Chrome') == -1;
}
