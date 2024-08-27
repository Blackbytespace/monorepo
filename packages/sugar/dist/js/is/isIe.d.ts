/**
 * @name        isIe
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        stable
 *
 * Detect if is ie (internet explorer)
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 * @return    {Boolean}    true if is ie, false if not
 *
 * @todo      tests
 *
 * @snippet         __isIe()
 *
 * @example 	js
 * import { __isIe } from '@lotsof/sugar/is'
 * if (__isIe()) {
 *   // do something cool
 * }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __isIe(ua?: string): boolean;
