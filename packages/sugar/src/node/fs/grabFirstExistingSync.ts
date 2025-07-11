import * as __fs from 'fs';

/**
 * @name                grabFirstExistingSync
 * @namespace           node.fs
 * @type                Function
 * @platform            node
 * @status              stable
 *
 * Check every passed paths and return the first existing one.
 *
 * @param         {String[]}            paths              The paths to check
 * @return          {String}                            The first existing path
 *
 * @todo            tests
 * 
 * @snippet         __gradFirst
 * 
 * @example       js
 * import { __grabFirstExistinSync } from '@blackbyte/sugar/fs';
 * __grabFirstExisting([
 *  'file/1.txt',
 *  'file/2.txt
 * ]); // => 'file/2.txt'
' *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __grabFirstExistingSync(paths: string[]): string {
  let result: string = '';
  for (let [idx, path] of Object.entries(paths)) {
    if (__fs.existsSync(path)) {
      result = path;
      break;
    }
  }
  return result;
}
