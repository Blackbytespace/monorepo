import { TSugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';

/**
 * @name            s-fit
 * @namespace       css.rule
 * @type            AtRule
 * @platform        css
 * @status          stable
 *
 * This rule allows you to make the element fit the parent element easily.
 * You can choose the `position` you want as well as if you want to `center` the element
 * using `left: 50%`, `top: 50%` and `transform: translate(-50%, -50%)`.
 *
 * @param      {String}        [position=absolute]              The position you want to apply to the element. Can be `absolute`, `abs`, `relative`, `rel`, `fixed` or `fix`
 * @param       {Boolean}       [center=false]                   If you want to center the element with `left: 50%`, `top: 50%` and `transform: translate(-50%, -50%)`
 * @return     {Css}                              The generated css
 *
 * @snippet       @s-fit($1, $2);
 *
 * @example         css
 * .my-element {
 *      @s-fit();
 *      @s-fit(fixed);
 *      @s-fit(abs, true);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */

export default function fit(v: any, settings: TSugarCssSettings): any {
  // parse args
  const args = {
    ...__parseArgs(v.prelude, ['position', 'center']),
  };
  args.values = {
    name: 'absolute',
    center: false,
    ...args.values,
  };

  let position = args.values.position;
  if (position === 'abs') position = 'absolute';
  if (position === 'rel') position = 'relative';
  if (position === 'fix') position = 'fixed';

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
              property: 'position',
              value: {
                type: position,
              },
            },
            {
              property: 'top',
              value: {
                type: 'length-percentage',
                value: {
                  type: 'percentage',
                  value: args.values.center ? 0.5 : 0,
                },
              },
            },
            {
              property: 'left',
              value: {
                type: 'length-percentage',
                value: {
                  type: 'percentage',
                  value: args.values.center ? 0.5 : 0,
                },
              },
            },
            {
              property: 'width',
              value: {
                type: 'length-percentage',
                value: {
                  type: 'percentage',
                  value: 1,
                },
              },
            },
            {
              property: 'height',
              value: {
                type: 'length-percentage',
                value: {
                  type: 'percentage',
                  value: 1,
                },
              },
            },
            {
              property: 'translate',
              value: {
                x: {
                  type: 'percentage',
                  value: args.values.center ? -0.5 : 0,
                },
                y: {
                  type: 'percentage',
                  value: args.values.center ? -0.5 : 0,
                },
                z: {
                  type: 'value',
                  value: {
                    unit: 'px',
                    value: 0,
                  },
                },
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
