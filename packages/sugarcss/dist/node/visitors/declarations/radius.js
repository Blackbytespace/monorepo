import __parseArgs from '../../utils/parseArgs.js';
import __toRem from '../../utils/toRem.js';
import { __dashCase } from '@lotsof/sugar/string';
/**
 * @name            s-radius
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variable allows you to declare a radius easily and use it in your css.
 * You can declare as many radius as you want.
 *
 * @param    {String}         topLeftOrAll          The top left radius value or the same value for all corners
 * @param    {String}         [topRight=null]              The top right radius value
 * @param    {String}         [bottomRight=null]              The bottom right radius value
 * @param    {String}         [bottomLeft=null]              The bottom left radius value
 *
 * @example         css
 * :root {
 *    --s-radius-default: 10px;
 *    --s-radius-special: 20px 10px 12px 34px;
 * }
 *
 * .my-element {
 *    border-radius: s-radius();
 *    border-radius: s-radius(special);
 *
 *   // or using a mixin
 *   @s-radius(special);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function radius(v, settings) {
    const name = v.name.replace(`--s-radius-`, ''), args = __parseArgs(v.value, [], {
        separator: ['white-space', 'comma'],
    });
    const result = [];
    const values = {
        topLeft: 0,
        topRight: 0,
        bottomRight: 0,
        bottomLeft: 0,
        ast: args.ast,
    };
    // adding spaces between each ast nodes
    // @TODO          find a better way to do this
    const newAst = {};
    for (let [key, value] of Object.entries(args.ast)) {
        newAst[key] = value;
        newAst[`space-${key}`] = {
            type: 'token',
            value: {
                type: 'white-space',
                value: ' ',
            },
        };
    }
    values.ast = newAst;
    if (Object.keys(args.values).length === 1) {
        values.topLeft = args.values.arg0;
        values.topRight = args.values.arg0;
        values.bottomRight = args.values.arg0;
        values.bottomLeft = args.values.arg0;
    }
    else if (Object.keys(args.values).length === 4) {
        values.topLeft = args.values.arg0;
        values.topRight = args.values.arg1;
        values.bottomRight = args.values.arg2;
        values.bottomLeft = args.values.arg3;
    }
    else {
        throw new Error(`Invalid number of arguments for radius: ${args.values.length}. Either 1 value applied on all corners, or 4 values, 1 for each corner.`);
    }
    // custom css variables
    ['topLeft', 'topRight', 'bottomRight', 'bottomLeft'].forEach((corner) => {
        result.push({
            property: `--s-radius-${name}-${__dashCase(corner)}`,
            value: {
                name: `--s-radius-${name}-${__dashCase(corner)}`,
                value: [
                    __toRem({
                        type: 'length',
                        value: {
                            unit: 'px',
                            value: values[corner],
                        },
                    }),
                ],
            },
        });
    });
    result.push({
        property: `--s-radius-${name}`,
        value: {
            name: `--s-radius-${name}`,
            value: [
                __toRem({
                    type: 'length',
                    value: {
                        unit: 'px',
                        value: values.topLeft,
                    },
                }),
            ],
        },
    });
    const displayValues = Object.assign({}, values);
    delete displayValues.ast;
    if (settings.verbose) {
        console.log(`Registered radius: <cyan>${name}</cyan>: <yellow>${JSON.stringify(displayValues)}</yellow>`);
    }
    return result;
}
//# sourceMappingURL=radius.js.map