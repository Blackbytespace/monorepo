import __isGlob from 'is-glob';
/**
 * @name                    isGlob
 * @namespace               shared.is
 * @type                    Function
 * @platform                js
 * @platform                node
 * @status                  stable
 *
 * Check if the passed string is a valid glob pattern or not
 *
 * @param                 {String}        $string             The string to check
 * @return                {Boolean}                           true if is a valid glob pattern, false if not
 *
 * @todo      tests
 *
 * @snippet         __isGlob($1)
 *
 * @example               js
 * import { __isGlob } from '@coffeekraken/sugar/is.js';
 * __isGlob('something/*.js); // => true
 *
 * @see       https://www.npmjs.com/package/is-glob
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (string) {
    return __isGlob(string);
}
//# sourceMappingURL=isGlob.js.map