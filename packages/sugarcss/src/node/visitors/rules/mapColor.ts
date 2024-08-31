import { TSugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';

import __ensureColorExists from '../../ensure/colorExists.js';

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

export default function color(v: any, settings: TSugarCssSettings): any {
  // parse args
  const args = {
    ...__parseArgs(v.prelude, ['to', 'name']),
  };
  args.values = {
    to: 'current',
    name: 'accent',
    ...args.values,
  };

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
