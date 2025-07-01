import { TSugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';

/**
 * @name            s-typo
 * @namespace       css.rule
 * @type            AtRule
 * @platform        css
 * @status          stable
 *
 * This rule allows you to apply a registered typography easily with all his properties like:
 * - `font`: The font to use from the registered ones
 * - `size`: The font size to use
 * - `line-height`: The line height to use
 * - `letter-spacing`: The letter spacing to use
 * - `text-transform`: The text transform to use
 * - `text-decoration`: The text decoration to use
 *
 * @param      {String}        name                 The typo name you want to apply
 * @return     {Css}                                The generated css
 *
 * @snippet       @s-typo($1);
 *
 * @example         css
 * :root {
 *    --s-typo-h1: s-font(sans) s-size(h1) 1.4 0;
 * }
 *
 * .my-element {
 *      @s-font(h1);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@blackbyte.space)
 */

export default function typo(v: any, settings: TSugarCssSettings): any {
  // parse args
  const args = {
    ...__parseArgs(v.prelude, ['name']),
  };
  args.values = {
    name: 'default',
    ...args.values,
  };

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
              property: 'unparsed',
              value: {
                propertyId: {
                  property: `font`,
                  vendor_prefix: [],
                },
                value: [
                  {
                    type: 'var',
                    value: {
                      name: {
                        ident: `--s-typo-${args.values.name}-font`,
                        from: null,
                      },
                      fallback: null,
                    },
                  },
                ],
              },
            },
            {
              property: 'unparsed',
              value: {
                propertyId: {
                  property: `font-size`,
                  vendor_prefix: [],
                },
                value: [
                  {
                    type: 'var',
                    value: {
                      name: {
                        ident: `--s-typo-${args.values.name}-size`,
                        from: null,
                      },
                      fallback: [
                        {
                          type: 'length',
                          value: {
                            value: 1,
                            unit: 'em',
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
            {
              property: 'unparsed',
              value: {
                propertyId: {
                  property: `line-height`,
                  vendor_prefix: [],
                },
                value: [
                  {
                    type: 'var',
                    value: {
                      name: {
                        ident: `--s-typo-${args.values.name}-line-height`,
                        from: null,
                      },
                      fallback: [
                        {
                          type: 'token',
                          value: {
                            type: 'number',
                            value: 1,
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
            {
              property: 'unparsed',
              value: {
                propertyId: {
                  property: `letter-spacing`,
                  vendor_prefix: [],
                },
                value: [
                  {
                    type: 'var',
                    value: {
                      name: {
                        ident: `--s-typo-${args.values.name}-letter-spacing`,
                        from: null,
                      },
                      fallback: [
                        {
                          type: 'token',
                          value: {
                            type: 'number',
                            value: 0,
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
            {
              property: 'unparsed',
              value: {
                propertyId: {
                  property: `text-transform`,
                  vendor_prefix: [],
                },
                value: [
                  {
                    type: 'var',
                    value: {
                      name: {
                        ident: `--s-typo-${args.values.name}-text-transform`,
                        from: null,
                      },
                      fallback: null,
                    },
                  },
                ],
              },
            },
            {
              property: 'unparsed',
              value: {
                propertyId: {
                  property: `text-decoration`,
                  vendor_prefix: [],
                },
                value: [
                  {
                    type: 'var',
                    value: {
                      name: {
                        ident: `--s-typo-${args.values.name}-text-decoration`,
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
