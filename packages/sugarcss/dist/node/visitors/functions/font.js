import { env } from '../../sugarcss.js';
import __parseArgs from '../../utils/parseArgs.js';
import __ensureFontExists from '../../ensure/fontExists.js';
/**
 * @name            s-font
 * @namespace       css.function
 * @type            Function
 * @platform        css
 * @status          stable
 *
 * Apply a font from the fonts registered ones.
 * The supported fonts properties are:
 *
 * - `family`: The font family like "sans-serif", "serif", etc...
 * - `size`: The font size like "1em", "12px", etc...
 * - `lineHeight`: The font line-height like "1em", "12px", etc...
 * - `weight`: The font weight like "normal", "bold", etc...
 * - `style`: The font style like "normal", "italic", etc...
 * - `variant`: The font variant like "normal", "small-caps", etc...
 * - `stretch`: The font stretch like "normal", "condensed", etc...
 *
 * @param      {String}        font         The font name you want to apply from registered ones
 * @return     {Css}                        The generated css
 *
 * @example         css
 * :root {
 *   --s-font-...: "Roboto,sans-serif", %size, %lineHeight, %weight, %style, %variant;
 *   --s-font-family-code: "Fira Code", monospace;
 *   --s-font-code: s-font-family(code), 16px, 26px, 300;
 * }
 *
 * .my-element {
 *   font: s-font(code);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function font(value, settings) {
    const args = __parseArgs(value.arguments, ['name']);
    const fontsArgs = env.fonts.fonts;
    __ensureFontExists(args.values.name);
    const fontArgs = fontsArgs[args.values.name];
    // size and line-height
    let size = '1em', lineHeight = '1.5em';
    if (fontArgs.size) {
        if (`${fontArgs.size}`.match(/^[0-9]+$/)) {
            size = `${fontArgs.size}px`;
        }
        else {
            size = fontArgs.size;
        }
    }
    if (fontArgs.lineHeight) {
        if (`${fontArgs.lineHeight}`.match(/^[0-9]+$/)) {
            lineHeight = `${fontArgs.lineHeight}px`;
        }
        else {
            lineHeight = fontArgs.lineHeight;
        }
    }
    const props = [];
    props.push(`var(--s-font-${args.values.name}-style, normal)`);
    props.push(`var(--s-font-${args.values.name}-variant, normal)`);
    props.push(`var(--s-font-${args.values.name}-weight, normal)`);
    props.push(`${size}/${lineHeight}`);
    props.push(`var(--s-font-${args.values.name}-family, sans-serif)`);
    return {
        raw: props.join(' '),
    };
}
//# sourceMappingURL=font.js.map