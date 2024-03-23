import __fs from 'fs-extra';
/**
 * @name                ensureFile
 * @namespace           node.fs
 * @type                Function
 * @async
 * @platform            node
 * @status              stable
 *
 * Ensure that the passed file exists. If not, it will be created... (async)
 *
 * @param       {String}              filePath           The file to ensure that it exists...
 * @return      {Promise}                           A promise that will be resolved once the file has been created if needed...
 *
 * @todo            tests
 *
 * @snippet         __ensureFile($1)
 * await __ensureFile($1)
 *
 * @example       js
 * import { __ensureFile } from '@coffeekraken/sugar/fs.js';
 * await __ensureFile('my/cool/file.jpg').then(() => {
 *    // do something...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __ensureFile(filePath) {
    return __fs.ensureFile(filePath);
}
//# sourceMappingURL=ensureFile.js.map