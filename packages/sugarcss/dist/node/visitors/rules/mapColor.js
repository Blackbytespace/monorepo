import __parseArgs from '../../utils/parseArgs.js';
import __ensureColorExists from '../../ensure/colorExists.js';
/**
 * @name            s-map-color
 * @namespace       css.rule
 * @type            AtRule
 * @platform        css
 * @status          stable
 *
 * This rule allows you to remap a color with a new one.
 * This is useful when using the `current` coloe in your components.
 * You can then change it by using this rule like this: `@s-map-color(complementary, current);`.
 * This will set the `current` color to the `complementary` one.
 *
 * @param       {String}        name              The color name you want to map
 * @param       {String}        to                The color name you want to map to
 * @return      {Css}                             The generated css
 *
 * @snippet       @s-map-color($1, $2);
 *
 * @example         css
 * :root {
 *    --s-color-accent: #ff0000;
 *    --s-color-complementary: #00ff00;
 *    --s-color-current: #0000ff;
 * }
 *
 * .my-element {
 *    ._title {
 *       color: s-color(current);
 *    }
 *
 *    &.-error {
 *      @s-map-color(complementary)
 *    }
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function color(v, settings) {
    // parse args
    const args = Object.assign({}, __parseArgs(v.prelude, ['name', 'to']));
    args.values = Object.assign({ to: 'accent', name: 'current' }, args.values);
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
                                name: `--s-color-${args.values.to}`,
                                value: [
                                    {
                                        type: 'var',
                                        value: {
                                            name: {
                                                ident: `--s-color-${args.values.name}-o`,
                                                from: null,
                                            },
                                            fallback: null,
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            property: 'custom',
                            value: {
                                name: `--s-color-${args.values.to}-h`,
                                value: [
                                    {
                                        type: 'var',
                                        value: {
                                            name: {
                                                ident: `--s-color-${args.values.name}-h`,
                                                from: null,
                                            },
                                            fallback: null,
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            property: 'custom',
                            value: {
                                name: `--s-color-${args.values.to}-s`,
                                value: [
                                    {
                                        type: 'var',
                                        value: {
                                            name: {
                                                ident: `--s-color-${args.values.name}-s`,
                                                from: null,
                                            },
                                            fallback: null,
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            property: 'custom',
                            value: {
                                name: `--s-color-${args.values.to}-l`,
                                value: [
                                    {
                                        type: 'var',
                                        value: {
                                            name: {
                                                ident: `--s-color-${args.values.name}-l`,
                                                from: null,
                                            },
                                            fallback: null,
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
//# sourceMappingURL=mapColor.js.map