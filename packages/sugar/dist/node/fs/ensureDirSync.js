import __fs from 'fs-extra';
import __path from 'path';
import __isDirectory from '../is/isDirectory.js';
/**
 * @name                ensureDirSync
 * @namespace           node.fs
 * @type                Function
 * @platform            node
 * @status              stable
 *
 * Ensure that the passed directory exists. If not, will be created recursively... (sync)
 *
 * @param       {String}              dir           The directory to ensure that it exists...
 * @return      {Promise}                           A promise that will be resolved once the directory has been created if needed...
 *
 * @todo        tests
 *
 * @snippet         __ensureDirSync($1)
 *
 * @example       js
 * import { __ensureDirSync } from '@lotsof/sugar/fs';
 * __ensureDirSync('my/cool/dir');
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __ensureDirSync(dir) {
    // check if the directory already exists
    if (__fs.existsSync(dir) && __isDirectory(dir))
        return;
    // if the passed path is a file
    if (!__isDirectory(dir)) {
        dir = __path.dirname(dir);
    }
    // create the directory
    if (!__fs.existsSync(dir)) {
        __fs.ensureDirSync(dir);
    }
}
//# sourceMappingURL=ensureDirSync.js.map