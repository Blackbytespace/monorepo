import __parseArgs from '../../utils/parseArgs.js';
import { env } from '../../sugarcss.js';
/**
 * @name            s-transition
 * @namespace       css.rule
 * @type            AtRule
 * @platform        css
 * @status          stable
 *
 * This declaration allows you to apply a registered transition easily.
 * To be able to use this, you need to register at least 1 transition like so:
 *
 * - `--s-transition-...: all .3s ease-in-out;`
 *
 * @param      {String}        name              The transition name you want to apply
 * @return     {Css}                              The generated css
 *
 * @snippet       @s-transition($1);
 *
 * @example         css
 * :root {
 *    --s-transition-slow: all .3s ease-in-out;
 * }
 *
 * .my-element {
 *      @s-transition(slow);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function transition(v, settings) {
    // parse args
    const args = Object.assign({}, __parseArgs(v.prelude, ['name']));
    args.values = Object.assign({ name: 'default' }, args.values);
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
                                name: 'transition',
                                value: env.transitions[args.values.name].ast.value,
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
//# sourceMappingURL=transition.js.map