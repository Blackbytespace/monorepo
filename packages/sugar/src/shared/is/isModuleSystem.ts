import __isCjs from './isCjs.js';
import __isEsm from './isEsm.js';

/**
 * @name            isModuleSystem
 * @namespace       shared.is
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * Check if the current module system the code runs on is one of the passed system names like "esm" or "cjs".
 *
 * @param       {('esm'|'cjs')[]}    systemNames    An array of system names to check against
 * @return      {Boolean}           true if the current system is one of the passed system names, false otherwise
 *
 * @todo        tests
 *
 * @snippet         __isModuleSystem($1)
 *
 * @example       js
 * import { __isModuleSystem } from '@blackbyte/sugar/is';
 * __isModuleSystem('esm'); // => true
 * __isModuleSystem('cjs'); // => false
 *
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __isModuleSystem(
  systemNames: ('esm' | 'cjs')[],
): boolean {
  if (!Array.isArray(systemNames)) systemNames = [systemNames];
  for (let i = 0; i < systemNames.length; i++) {
    if (__isCjs() && systemNames[i] === 'cjs') return true;
    if (__isEsm() && systemNames[i] === 'esm') return true;
  }
  return false;
}
