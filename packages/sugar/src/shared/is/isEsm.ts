import __isCjs from './isCjs.js';

/**
 * @name                isEsm
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if the current module system the code runs on "esm" module system.
 *
 * @return      {Boolean}           true if the current system is esm
 *
 * @snippet         __isEsm()
 *
 * @todo            tests
 *
 * @example       js
 * import { __isEsm } from '@lotsof/sugar/is';
 * __isEsm(); // => true
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __isEsm(): boolean {
  return !__isCjs();
}
