import { TSugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';

/**
 * @name            s-weight
 * @namespace       css.rule
 * @type            Function
 * @platform        css
 * @status          stable
 *
 * This rule allows you to get a font weight from the registered ones or from the default ones that are:
 *
 * - thin: 100
 * - extra-light: 200
 * - lighter: 200
 * - light: 300
 * - regular/normal: 400
 * - medium: 500
 * - semi-bold: 600
 * - bold: 700
 * - bolder: 800
 * - extra-bold: 800
 * - black: 900
 *
 * @param      {String}        weight        The weight you want to get like "bold", "light", etc...
 * @return     {Css}                          The generated css
 *
 * @example         css
 * :root {
 *    --s-weight-boldeeeeeerrrrrr: 9000;
 * }
 *
 * .my-element {
 *    @s-weight(bold); // font-weight: 700;
 *    @s-weight(light); // font-weight: 300,
 *    @s-weight(boldeeeeeerrrrrr); // font-weight: 9000;
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@blackbyte.space)
 */
export default function weight(v: any, settings: TSugarCssSettings): any {
  // parse args
  const args = {
    ...__parseArgs(v.prelude, ['weight']),
  };
  args.values = {
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
                  property: 'font-weight',
                },
                value: [
                  {
                    type: 'function',
                    value: {
                      name: 's-weight',
                      arguments: v.prelude,
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
