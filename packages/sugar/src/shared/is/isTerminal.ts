/**
 * @name                isTerminal
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * This function simply returns if the process runs inside a terminal or not
 *
 * @return      {Boolean}           true if is in the terminal, false if not
 *
 * @snippet         __isTerminal($1)
 *
 * @example         js
 * import { __isTerminal } from '@lotsof/sugar/is';
 * __isTerminal(); // => true
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __isTerminal(): boolean {
  // @ts-ignore
  if (process && process.stdout && process.stdout.isTTY) return true;
  return false;
}
