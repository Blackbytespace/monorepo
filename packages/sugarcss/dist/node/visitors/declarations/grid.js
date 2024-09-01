import { env } from '../../sugarcss.js';
import __parseArgs from '../../utils/parseArgs.js';
/**
 * @name            s-grid
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variable allows you to register some grid layouts that you can use in your css.
 * You can register as many grid as you want like in the example below.
 *
 * @param      {String}         layout                The grid layout to register like `1 1 2 _ 3 3 3`
 * @param     {String}         gap                   The grid gap to register like `20px`
 *
 * @example         css
 * :root {
 *    --s-grid-default: '1 1 2 _ 3 3 3' 20px;
 *    --s-grid-2cols: '1 2' 40px;
 * }
 *
 * .my-element {
 *    @s-grid(default);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function grid(v, settings) {
    const name = v.name.replace(`--s-grid-`, ''), args = __parseArgs(v.value, ['layout', 'gap'], {
        separator: ['white-space', 'comma'],
    });
    const result = [];
    // save in env
    if (!env.grids[name]) {
        env.grids[name] = {
            layout: args.values.layout,
            gap: args.values.gap,
            ast: args.ast,
        };
    }
    // custom css variables
    result.push({
        property: `--s-grid-${name}-layout`,
        value: {
            name: `--s-grid-${name}-layout`,
            value: [args.ast.layout],
        },
    });
    result.push({
        property: `--s-grid-${name}-gap`,
        value: {
            name: `--s-grid-${name}-gap`,
            value: [args.ast.gap],
        },
    });
    if (settings.verbose) {
        const displayLayout = Object.assign({}, env.grids[name]);
        delete displayLayout.ast;
        console.log(`Registered grid <cyan>${name}</cyan>: <yellow>${JSON.stringify(displayLayout)}</yellow>`);
    }
    return result;
}
//# sourceMappingURL=grid.js.map