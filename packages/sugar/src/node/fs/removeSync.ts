import __fs from 'fs-extra';

/**
 * @name            removeSync
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
 * @snippet         __removeSync($1)
 *
 * @example       js
 * import { __removeSync } from '@blackbyte/sugar/fs';
 *  __removeSync('my/cool/file.json');
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __removeSync(path: string): void {
  __fs.removeSync(path);
}
