import { TSugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';

/**
 * @name            s-font
 * @namespace       css.rule
 * @type            AtRule
 * @platform        css
 * @status          stable
 *
 * This rule allows you to apply a registered font easily with all his properties like:
 * - `family`: The font family like "sans-serif", "serif", etc...
 * - `weight`: The font weight like "normal", "bold", etc...
 * - `style`: The font style like "normal", "italic", etc...
 * - `variant`: The font variant like "normal", "small-caps", etc...
 * - `letter-spacing`: The font letter spacing like "normal", "0.1em", etc...
 *
 * @param      {String}        name              The font name you want to apply
 * @return     {Css}                              The generated css
 *
 * @snippet       @s-font($1);
 *
 * @example         css
 * :root {
 *    --s-font-title: VT323 600 normal normal 0.1em;
 * }
 *
 * .my-element {
 *      @s-font(title);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */

export default function font(v: any, settings: TSugarCssSettings): any {
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
                  property: `font-family`,
                  vendor_prefix: [],
                },
                value: [
                  {
                    type: 'var',
                    value: {
                      name: {
                        ident: `--s-font-${args.values.name}-family`,
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
                  property: `font-weight`,
                  vendor_prefix: [],
                },
                value: [
                  {
                    type: 'var',
                    value: {
                      name: {
                        ident: `--s-font-${args.values.name}-weight`,
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
                  property: `font-style`,
                  vendor_prefix: [],
                },
                value: [
                  {
                    type: 'var',
                    value: {
                      name: {
                        ident: `--s-font-${args.values.name}-style`,
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
                  property: `font-variant`,
                  vendor_prefix: [],
                },
                value: [
                  {
                    type: 'var',
                    value: {
                      name: {
                        ident: `--s-font-${args.values.name}-variant`,
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
