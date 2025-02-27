/**
 * @name          isHlsSupported
 * @namespace     js.is
 * @type          Function
 * @platform      js
 * @status        stable
 *
 * Check if the HLS format is supported by the browser
 *
 * @return      {Boolean}       true if supported, false if not
 *
 * @snippet         __isHlsSupported($1)
 *
 * @todo      tests
 *
 * @example    js
 * import { __isHlsSupported } from '@lotsof/sugar/id'
 * if (!__isHlsSupported()) {
 *   // do something
 * }
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function isHlsSupported(): boolean;
