import __fs from 'fs-extra';

/**
 * @name                emptyDir
 * @namespace           node.fs
 * @type                Function
 * @async
 * @platform            node
 * @status              stable
 *
 * Empty a directory (async)
 *
 * @param       {String}              dir           The directory path to empty
 * @return      {Promise}                           A promise that will be resolved once the directory has been cleaned
 *
 * @todo        tests
 *
 * @snippet             __emptyDir($1)
 * await __emptyDir($1)
 *
 * @example       js
 * import { __emptyDir } from '@coffeekraken/sugar/fs.js';
 * await __emptyDir('my/cool/directory').then(() => {
 *    // do something...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __emptyDir(dir: string): Promise<void> {
  return __fs.emptyDir(dir);
}
