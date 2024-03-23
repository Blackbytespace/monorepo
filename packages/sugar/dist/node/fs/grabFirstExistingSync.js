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
 * import { __grabFirstExistinSync } from '@coffeekraken/sugar/fs.js';
 * __grabFirstExisting([
 *  'file/1.txt',
 *  'file/2.txt
 * ]); // => 'file/2.txt'
' *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __grabFirstExistingSync(paths) {
    let result = '';
    for (let [idx, path] of Object.entries(paths)) {
        if (__fs.existsSync(path)) {
            result = path;
            break;
        }
    }
    return result;
}
//# sourceMappingURL=grabFirstExistingSync.js.map