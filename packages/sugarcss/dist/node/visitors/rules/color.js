import __parseArgs from '../../utils/parseArgs.js';
import __ensureColorExists from '../../ensure/colorExists.js';
import { env } from '../../sugarcss.js';
/**
 * @name            s-radius
 * @namespace       css.rule
 * @type            AtRule
 * @platform        css
 * @status          stable
 *
 * This declaration allows you to apply a registered raius easily.
 * To be able to use this, you need to register at least 1 radius like in the example below:
 *
 * @param      {String}        name              The transition name you want to apply
 * @return     {Css}                              The generated css
 *
 * @snippet       @s-radius($1);
 *
 * @example         css
 * :root {
 *    --s-radius-default: 10px;
 *    --s-radius-special: 20px 10px 12px 34px;
 * }
 *
 * .my-element {
 *      @s-radius();
 * }
 *
 * .my-other-element {
 *     @s-radius(special);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function color(v, settings) {
    // parse args
    const args = Object.assign({}, __parseArgs(v.prelude, ['name']));
    args.values = Object.assign({}, args.values);
    __ensureColorExists(args.values.name);
    const ast = [
        {
            type: 'style',
            value: {
                selectors: [
                    [
                        {
                            type: 'nesting',
                        },
                    ],
                ],
                declarations: {
                    importantDeclarations: [],
                    declarations: [
                        {
                            property: 'custom',
                            value: {
                                name: 'border-radius',
                                value: Object.values(env.radiuses[args.values.name].ast),
                            },
                        },
                    ],
                },
                rules: [],
                loc: {
                    source_index: 4,
                    line: 0,
                    column: 19,
                },
            },
        },
    ];
    return ast;
}
//# sourceMappingURL=color.js.map