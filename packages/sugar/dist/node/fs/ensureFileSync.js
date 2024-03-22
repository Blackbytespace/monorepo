import __fs from 'fs-extra';
/**
 * @name            ensureFileSync
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * Ensure that the passed file exists. If not, will be created... (async)
 *
 * @param       {String}              filePath           The file to ensure that it exists...
 *
 * @todo        tests
 *
 * @snippet         __ensureFileSync($1)
 *
 * @example       js
 * import { __ensureFileSync } from '@coffeekraken/sugar/fs';
 * __ensureFileSync('my/cool/file.jpg');
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __ensureFileSync(filePath) {
    __fs.ensureFileSync(filePath);
}
//# sourceMappingURL=ensureFileSync.js.map