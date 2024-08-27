import { env } from '../../sugarcss.js';
import __parseArgs from '../../utils/parseArgs.js';
/**
 * @name            s-media
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variable allows you to declare a media query easily and use it in your css.
 * You can declare as many media queries as you want.
 *
 * @param    {String}         min                The min value for the media query
 * @param    {String}         max                The max value for the media query
 *
 * @example         css
 * :root {
 *    --s-media-mobile: 0 768px;
 *    --s-media-tablet: 769px 1024px;
 *    --s-media-desktop: 1025px;
 *    --s-media-wide: 1440px;
 * }
 *
 * .my-element {
 *    color: s-color(accent);
 *
 *    \@media mobile {
 *        color: red;
 *    }
 *
 *    \@media lt-tablet {
 *        color: blue;
 *    }
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function media(v, settings) {
    var _a, _b;
    const media = v.name.replace(`--s-media-`, ''), args = __parseArgs(v.value, ['min', 'max'], {
        separator: ['white-space', 'comma'],
    });
    const result = [];
    if (!env.medias[media]) {
        env.medias[media] = {};
    }
    env.medias[media].min = (_a = args.values.min) !== null && _a !== void 0 ? _a : 0;
    env.medias[media].max = (_b = args.values.max) !== null && _b !== void 0 ? _b : 0;
    // set new css variables
    if (args.ast.min) {
        result.push({
            property: `--s-media-${media}-min`,
            value: {
                name: `--s-media-${media}-min`,
                value: [args.ast.min],
            },
        });
    }
    if (args.ast.max) {
        result.push({
            property: `--s-media-${media}-max`,
            value: {
                name: `--s-media-${media}-max`,
                value: [args.ast.max],
            },
        });
    }
    if (settings.verbose) {
        console.log(`Registered media: <cyan>${media}</cyan>: <yellow>${JSON.stringify(env.medias[media])}</yellow>`);
    }
    return result;
}
//# sourceMappingURL=media.js.map