/**
 * @name        isSamsumgBrowser
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        stable
 *
 * Detect if is the samsung stock browser that is running the page
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 * @return      {Boolean}                                       true if is a samsung browser, false if not
 *
 * @todo      tests
 *
 * @snippet         __isSamsungBrowser()
 *
 * @example    js
 * import { __isSamsumgBrowser } from '@blackbyte/sugar/is'
 * if (__isSamsumgBrowser()) {
 *   // do something
 * }
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __isSamsumgBrowser(
  ua: string = navigator.userAgent,
): boolean {
  return ua.match(/SamsungBrowser/i) !== null;
}
