import { __dashCase } from '@lotsof/sugar/string';
import { env } from '../../sugarcss.js';
import __parseArgs from '../../utils/parseArgs.js';
/**
 * @name            s-container
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * The container variables allows you to specify some container related variables like the max-width, side padding, etc...
 *
 * @param      {String}        minWidth             The min width of the container
 * @param      {String}        maxWidth             The max width of the container
 * @param      {String}        sidePadding          The side padding of the container
 *
 * @example         css
 * :root {
 *    // min-width max-width side-padding
 *    --s-container-default: 320px 1200px 20px;
 * }
 *
 * .my-element {
 *      @s-container();
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function container(v, settings) {
    var _a, _b, _c;
    const name = v.name.replace(`--s-container-`, ''), args = __parseArgs(v.value, ['minWidth', 'maxWidth', 'sidePadding'], {
        separator: ['white-space', 'comma'],
    });
    if (!env.containers[name]) {
        env.containers[name] = args.values;
    }
    if (settings.verbose) {
        console.log(`Registered container: <cyan>${name}</cyan>: <yellow>${JSON.stringify(env.containers[name])}</yellow>`);
    }
    const result = [];
    for (let [key, value] of Object.entries(args.values)) {
        result.push({
            property: `--s-container-${name}-${__dashCase(key)}`,
            value: {
                name: `--s-container-${name}-${__dashCase(key)}`,
                value: [
                    {
                        type: 'length',
                        value: {
                            unit: (_c = (_b = (_a = args.ast[key]) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.unit) !== null && _c !== void 0 ? _c : 'px',
                            value: value,
                        },
                    },
                ],
            },
        });
    }
    return result;
}
//# sourceMappingURL=container.js.map