import { env } from '../../sugarcss.js';
import __parseArgs from '../../utils/parseArgs.js';
import __argsToCustomPropertiesAst from '../../utils/argsToCustomPropertiesAst.js';
/**
 * @name            s-font
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variable allows you to declare a font easily and use it in your css.
 * You can declare as many fonts as you want.
 *
 * @param     {String}        family                The font family to use
 * @param     {String}        weight                 The font weight to use
 * @param     {String}        style                  The font style to use
 * @param     {String}        variant                The font variant to use
 *
 * @example         css
 * :root {
 *    --s-font-default: s-font-family(sans);
 *    --s-font-lead: s-font-family(sans);
 *    --s-font-title: VT323 600;
 *    --s-font-code: s-font-family(code) 300;
 * }
 *
 * .my-element {
 *    font: s-font(default);
 *    font: s-font(lead);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function font(v, settings) {
    const name = v.name.replace(`--s-font-`, '');
    const args = __parseArgs(v.value, ['family', 'weight', 'style', 'variant'], {
        separator: ['white-space', 'comma'],
        // debug: true,
    });
    env.fonts.fonts[name] = args.values;
    if (settings.verbose) {
        console.log(`Registered font: <cyan>${name}</cyan>: <yellow>${JSON.stringify(args.values)}</yellow>`);
    }
    const result = __argsToCustomPropertiesAst(v.name, args);
    return result;
}
//# sourceMappingURL=font.js.map