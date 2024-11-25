import __parseArgs from '../../utils/parseArgs.js';
import __toRem from '../../utils/toRem.js';
/**
 * @name            s-size
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variables allows you to register a size value that you can use in your css easily.
 * through the s-size() function.
 * You can register as many size as you want.
 *
 * @param           {Number}       value            The value to register for your size
 *
 * @example         css
 * :root { *
 *      --s-size-small: 10px;
 *      --s-size-medium: 20px;
 *      --s-size-large: 40px;
 * }
 *
 * .my-element {
 *    padding: s-size(small); // 10px
 *    padding: s-size(medium); // 20px
 *    padding: s-size(large); // 40px
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function size(v, settings) {
    const name = v.name.replace(`--s-size-`, '').replace(/\-[a-z]$/, '');
    const args = __parseArgs(v.value, ['value'], {
        separator: ['white-space', 'comma'],
    });
    let value = args.values;
    const result = [];
    result.push({
        property: `--s-size-${name}`,
        value: {
            name: `--s-size-${name}`,
            value: [
                typeof value.value === 'string'
                    ? args.ast.value
                    : __toRem({
                        type: 'length',
                        value: {
                            unit: 'px',
                            value: value.value,
                        },
                    }),
            ],
        },
    });
    if (settings.verbose) {
        console.log(`Registered size: <cyan>${name}</cyan>: <yellow>${JSON.stringify({
            name,
            value: value.value,
        })}</yellow>`);
    }
    return result;
}
//# sourceMappingURL=size.js.map