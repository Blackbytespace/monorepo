/**
 * @name                parseColor
 * @namespace           shared.color
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 * @private
 *
 * Parse a string and return you the wanted object format like "rgba", "hsl" or "hsv".
 *
 * @param       {String}      color       The color to parse like (#ff0000 | rgba(...) | hsl(...) | hsv(...))
 * @param       {String}      [format='rgba']       The object format wanted. Can be "rgba" or "hsla"
 * @return      {Object}                  The rgba representation of the passed color
 *
 * @todo      tests
 *
 * @snippet         __parseColor($1)
 *
 * @example         js
 * import { __parseColor } from '@lotsof/sugar/color';
 * __parseColor('rgba(10,20,30,100)'); // => { r: 10, b: 20, b: 30, a: 100 }
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export type TParseColorRgbaResult = {
    r: number;
    g: number;
    b: number;
    a: number;
};
export type TParseColorHslaResult = {
    h: number;
    s: number;
    l: number;
    a: number;
};
export default function __parseColor(color: string, format?: string): TParseColorHslaResult | TParseColorRgbaResult;
