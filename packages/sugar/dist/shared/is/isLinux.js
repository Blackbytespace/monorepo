/**
 * @name                isLinux
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if the app run on linux
 *
 * @return        {Boolean}                             true if linux, false if not
 *
 * @todo      tests
 *
 * @snippet         __isLinux($1)
 *
 * @example       js
 * import { __isLinux } from '@coffeekraken/sugar/is.js';
 * __isLinux(); // => true
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isLinux() {
    var _a;
    if (process && process.platform) {
        return process.platform === 'linux';
    }
    const platform = ((_a = navigator === null || navigator === void 0 ? void 0 : navigator.userAgentData) === null || _a === void 0 ? void 0 : _a.platform) ||
        (navigator === null || navigator === void 0 ? void 0 : navigator.platform) ||
        'unknown';
    return platform.toUpperCase().indexOf('LINUX') >= 0;
}
//# sourceMappingURL=isLinux.js.map