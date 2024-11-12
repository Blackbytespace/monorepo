import __extension from '../fs/extension.js';
/**
 * @name                 filename
 * @namespace            node.fs
 * @type                 Function
 * @platform             node
 * @status               stable
 *
 * Return the filename from the passed path with or without the extension
 *
 * @param           {String}              path              The path to take the filename from
 * @param           {Boolean}             [withExtension=true]        Tell if we want the filename with or without the extension
 * @return          {String}                                  The requested filename
 *
 * @todo        tests
 *
 * @snippet         __filename($1)
 *
 * @example       js
 * import { __filename } from '@lotsof/sugar/fs';
 * __filename('hello/world.js'); // => world.js
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __filename(path, withExtension = true) {
    var _a;
    let filename = (_a = path.split('/').pop()) !== null && _a !== void 0 ? _a : '';
    if (!withExtension) {
        filename = filename.replace(`.${__extension(filename)}`, '');
    }
    return filename;
}
//# sourceMappingURL=filename.js.map