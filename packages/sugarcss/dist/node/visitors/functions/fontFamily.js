import __parseArgs from '../../utils/parseArgs.js';
/**
 * @name            s-font-family
 * @namespace       css.function
 * @type            Function
 * @platform        css
 * @status          stable
 *
 * Apply a font family from the fonts registered ones.
 *
 * @param      {String}        font         The font name you want to apply from registered ones
 * @return     {Css}                        The generated css
 *
 * @example         css
 * :root {
 *   --s-font-family-code: "Fira Code", monospace;
 * }
 *
 * .my-element {
 *   font-family: s-font-family(code);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function fontFamily(value, settings) {
    const args = __parseArgs(value.arguments, ['name'], {
        separator: ['white-space', 'comma'],
    });
    return {
        raw: `var(--s-font-family-${args.values.name})`,
    };
}
//# sourceMappingURL=fontFamily.js.map