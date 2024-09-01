import { __camelCase } from '@lotsof/sugar/string';
import { env } from '../../sugarcss.js';
import __parseArgs from '../../utils/parseArgs.js';
/**
 * @name            s-sizes
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variable allows you to register a size value that you can use in your css easily.
 * You can register as many size as you want.
 *
 * @param     {String}         min                The easing value for the min size
 * @param     {String}         max                The easing value for the max size
 * @param     {String}         [easing='linear']             The easing value for the size
 *
 * @example         css
 * :root {
 *      --s-sizes: 0px 80px;
 * }
 *
 * .my-element {
 *    font-size: s-size(10); // 8px
 *    font-size: s-size(20); // 16px
 *    font-size: s-size(100); // 80px
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function sizes(v, settings) {
    const args = __parseArgs(v.value, ['min', 'max', 'easing'], {
        separator: ['white-space', 'comma'],
    });
    const result = [];
    let value = args.values;
    if (value.easing) {
        value.easing = __camelCase(value.easing);
    }
    // save in config
    env.sizes = value;
    // custom css variables
    for (let [key, value] of Object.entries(args.ast)) {
        result.push({
            property: `--s-sizes-${key}`,
            value: {
                name: `--s-sizes-${key}`,
                value: [value],
            },
        });
    }
    if (settings.verbose) {
        console.log(`Registered sizes settings: <yellow>${JSON.stringify(env.sizes)}</yellow>`);
    }
    return result;
}
//# sourceMappingURL=sizes.js.map