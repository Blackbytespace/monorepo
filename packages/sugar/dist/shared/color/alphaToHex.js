/**
 * @name                alphaToHex
 * @namespace           shared.color
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Take alpha (0-1) and convert it to hex like "FF", "80", etc...
 *
 * @param       {Number}            alpha           The alpha to convert to hex (0-1)
 * @return          {String}                        The hex string
 *
 * @todo      tests
 *
 * @snippet         __alphaToHex($1)
 *
 * @example         js
 * import { __alphaToHex } from '@lotsof/sugar/color';
 * __alphaToHex(1); // FF
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __alphaToHex(alpha) {
    const _opacity = Math.round(Math.min(Math.max(alpha || 1, 0), 1) * 255);
    return _opacity.toString(16);
}
//# sourceMappingURL=alphaToHex.js.map