import { camelCase } from '@blackbyte/sugar/string';
import __parseArgs from '../../utils/parseArgs.js';
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
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@blackbyte.space)
 */
export default function transition(v, settings) {
    // parse args
    const args = Object.assign({}, __parseArgs(v.prelude, ['nameOrModifiers', 'modifiers'], {}));
    let name = 'default', modifiers = {};
    if (typeof args.values.nameOrModifiers === 'string') {
        name = args.values.nameOrModifiers;
    }
    else if (typeof args.values.nameOrModifiers === 'object') {
        modifiers = args.ast.nameOrModifiers;
    }
    if (typeof args.values.modifiers === 'object') {
        modifiers = args.ast.modifiers;
    }
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
                        'property',
                        'duration',
                        'timing-function',
                        'delay',
                    ].map((prop) => {
                        const camelProp = camelCase(prop);
                        if (modifiers[prop] || modifiers[camelProp]) {
                            return {
                                property: 'unparsed',
                                value: {
                                    propertyId: {
                                        property: `transition-${prop}`,
                                        vendor_prefix: [],
                                    },
                                    value: [modifiers[prop] || modifiers[camelProp]],
                                },
                            };
                        }
                        return {
                            property: 'unparsed',
                            value: {
                                propertyId: {
                                    property: `transition-${prop}`,
                                    vendor_prefix: [],
                                },
                                value: [
                                    {
                                        type: 'var',
                                        value: {
                                            name: {
                                                ident: `--s-transition-${name}-${prop}`,
                                                from: null,
                                            },
                                            fallback: null,
                                        },
                                    },
                                ],
                            },
                        };
                    }),
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