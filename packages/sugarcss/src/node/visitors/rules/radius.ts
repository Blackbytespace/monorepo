import { TSugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';

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
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@blackbyte.space)
 */

export default function radius(v: any, settings: TSugarCssSettings): any {
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
            'top-left',
            'top-right',
            'bottom-left',
            'bottom-right',
          ].map((corner) => {
            return {
              property: 'unparsed',
              value: {
                propertyId: {
                  property: `border-${corner}-radius`,
                  vendor_prefix: [],
                },
                value: [
                  {
                    type: 'var',
                    value: {
                      name: {
                        ident: `--s-radius-${args.values.name}-${corner}`,
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
