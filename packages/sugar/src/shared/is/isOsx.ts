/**
 * @name                isOsx
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if the app run on mac OS X or not
 *
 * @return        {Boolean}                             true if mac OS X, false if not
 *
 * @todo      tests
 *
 * @snippet         __isOsx()
 *
 * @example       js
 * import { __isOsx } from '@lotsof/sugar/is';
 * __isOsx(); // => true
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __isOsx(): boolean {
  if (process && process.platform) {
    return process.platform === 'darwin';
  }
  const platform =
    (<any>navigator)?.userAgentData?.platform ||
    navigator?.platform ||
    'unknown';
  return platform.toUpperCase().indexOf('MAC') >= 0;
}
