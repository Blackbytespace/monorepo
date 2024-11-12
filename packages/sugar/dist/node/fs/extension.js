/**
 * @name                 extension
 * @namespace            node.fs
 * @type                 Function
 * @platform             node
 * @status               stable
 *
 * Return the passed file path extension
 *
 * @param           {String}            path                The file path to get the extension from
 * @return          {String}                                The file extension
 *
 * @todo        tests
 *
 * @snippet         __extension($1)
 *
 * @example         js
 * import { __extension } from '@lotsof/sugar/fs';
 * __extension('hello/world.jpg'); // => jpg
 *
 * @since         1.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __extension(path) {
    var _a, _b;
    const lastPart = (_a = path.split('/').pop()) !== null && _a !== void 0 ? _a : '';
    if (!lastPart.includes('.'))
        return '';
    return (_b = path.split('.').pop()) !== null && _b !== void 0 ? _b : '';
}
//# sourceMappingURL=extension.js.map