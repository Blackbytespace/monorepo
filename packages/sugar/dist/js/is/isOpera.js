/**
 * @name        isOpera
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        stable
 *
 * Detect if is opera
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 * @return    {Boolean}    true if is opera, false if not
 *
 * @todo      tests
 *
 * @snippet         __isOpera()
 *
 * @example 	js
 * import { __isOpera } from '@lotsof/sugar/is'
 * if ( __isOpera()) {
 *   // do something cool
 * }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __isOpera(ua = navigator.userAgent) {
    return ua.toLowerCase().indexOf('op') > -1;
}
//# sourceMappingURL=isOpera.js.map