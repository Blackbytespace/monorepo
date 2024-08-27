import __fs from 'fs';
import __isDirectory from '../is/isDirectory.js';
/**
 * @name            unlink
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * unlinks a file or directory. The directory can have contents. If the path does not exist, silently does nothing. Like rm -rf (async)
 *
 * @param       {String}              path           The file/directory path to delete
 * @return      {Promise}                           A promise that will be resolved when the unlink is completed
 *
 * @todo        tests
 *
 * @snippet         __unlink($1)
 * await __unlink($1)
 *
 * @example       js
 * import { __unlink } from '@lotsof/sugar/fs';
 * await __unlink('my/cool/file.json').then(() => {
 *    // do something on complete...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __unlink(path) {
    if (!__fs.existsSync(path))
        return Promise.resolve();
    if (__isDirectory(path)) {
        return __fs.promises.rmdir(path, { recursive: true });
    }
    else {
        return __fs.promises.unlink(path);
    }
}
//# sourceMappingURL=unlink.js.map