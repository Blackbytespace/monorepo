/**
 * @name                isMap
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if the passed value is a js Map
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a Map, false if not
 *
 * @todo      tests
 *
 * @snippet         __isMap($1)
 *
 * @example    js
 * import { __isMap } from '@coffeekraken/sugar/is'
 * const map = new Map();
 * if (__isMap(map) {
 *   // do something
 * }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isMap(value) {
    return value instanceof Map;
}
//# sourceMappingURL=isMap.js.map