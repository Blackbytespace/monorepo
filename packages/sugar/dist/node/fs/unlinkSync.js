import __fs from 'fs';
import __isDirectory from '../is/isDirectory.js';
/**
 * @name            unlinkSync
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * Removes a file or directory. The directory can have contents. If the path does not exist, silently does nothing. Like rm -rf (sync)
 *
 * @param       {String}              path           The file/directory path to delete
 *
 * @todo      tests
 *
 * @snippet         __unlinkSync($1)
 *
 * @example       js
 * import { __unlinkSync } from '@lotsof/sugar/fs';
 *  __unlinkSync('my/cool/file.json');
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __unlinkSync(path) {
    if (!__fs.existsSync(path))
        return;
    if (__isDirectory(path)) {
        __fs.rmdirSync(path, { recursive: true });
    }
    else {
        __fs.unlinkSync(path);
    }
}
//# sourceMappingURL=unlinkSync.js.map