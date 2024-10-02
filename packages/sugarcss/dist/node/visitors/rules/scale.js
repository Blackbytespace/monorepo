import __parseArgs from '../../utils/parseArgs.js';
/**
 * @name            s-scale
 * @namespace       css.rule
 * @type            AtRule
 * @platform        css
 * @status          stable
 *
 * This declaration allows you to apply a scale to the current element and his children.
 * It is applied on functions like `s-space`, `s-size`, etc...
 *
 * @param       {Number}            ratio                       The scale ratio you want to apply
 * @return      {Css}                             The generated css
 *
 * @snippet       @s-scale(2);
 *
 * @example         css
 *
 * .my-element {
 *    ._title {
 *       font-size: s-size(20);
 *    }
 *
 *    &.-big {
 *      @s-scale(2);
 *    }
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function scale(v, settings) {
    // parse args
    const args = Object.assign({}, __parseArgs(v.prelude, ['ratio']));
    args.values = Object.assign({ ratio: 1 }, args.values);
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
                                name: `--s-scale`,
                                value: [
                                    {
                                        type: 'token',
                                        value: {
                                            type: 'number',
                                            value: args.values.ratio,
                                        },
                                    },
                                ],
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
//# sourceMappingURL=scale.js.map