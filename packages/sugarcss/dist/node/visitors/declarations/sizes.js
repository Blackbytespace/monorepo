import { __camelCase } from '@lotsof/sugar/string';
import __parseArgs from '../../utils/parseArgs.js';
/**
 * @name            s-sizes
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variable allows you to declare the sizes values to use in your css.
 * You can either declare a min and max size value and an easing function to be used when you
 * ask for a size value with a number.
 *
 * @param     {String}         min                The easing value for the min size
 * @param     {String}         max                The easing value for the max size
 * @param     {String}         [easing='linear']             The easing value for the size
 *
 * @example         css
 * :root {
 *      --s-sizes: 0 80px;
 *
 *      /* Define named sizes * /
 *      --s-size-small: 10px;
 *      --s-size-medium: 20px;
 *      --s-size-large: 40px;
 * }
 *
 * .my-element {
 *    padding: s-size(10); // 80px / 100 * 10 = 8px
 *    padding: s-size(100); // 80px / 100 * 100 = 80px
 *    padding: s-size(small); // 10px
 *    padding: s-size(medium); // 20px
 *    padding: s-size(large); // 40px
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
        console.log(`Registered sizes settings: <yellow>${JSON.stringify({
            min: value.min,
            max: value.max,
            easing: value.easing,
        })}</yellow>`);
    }
    return result;
}
//# sourceMappingURL=sizes.js.map