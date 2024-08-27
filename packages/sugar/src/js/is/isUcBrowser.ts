/**
 * @name        isUcBrowser
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        stable
 *
 * Detect if is the UC stock browser that is running the page
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 *
 * @todo      tests
 *
 * @snippet         __isUcBrowser()
 *
 * @example    js
 * import { __isUcBrowser } from '@lotsof/sugar/is'
 * if (__isUcBrowser()) {
 *   // do something
 * }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __isUcBrowser(
  ua: string = navigator.userAgent,
): boolean {
  return ua.match(/UCBrowser/i) !== null;
}
