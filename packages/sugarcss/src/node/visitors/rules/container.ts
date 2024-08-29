import { TSugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';

/**
 * @name            s-container
 * @namespace       css.rule
 * @type            AtRule
 * @platform        css
 * @status          stable
 *
 * This rule allows you to make the element a container easily.
 * The container width if relative to the `--s-container-max-width`
 * and the `--s-container-side-padding` variables
 *
 * @param       {String}        [container=default]                   The container you want to apply to the container. Can be any registered container
 * @return     {Css}                              The generated css
 *
 * @snippet       @s-container($1);
 *
 * @example         css
 * :root {
 *    // min-width max-width side-padding
 *    --s-container-default: 320px 1200px 20px;
 *    --s-container-full: 0 100% 20px;
 * }
 *
 * .my-element {
 *      @s-container();
 *      @s-container(full);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */

export default function container(v: any, settings: TSugarCssSettings): any {
  // parse args
  const args = {
    ...__parseArgs(v.prelude, ['container']),
  };
  args.values = {
    container: 'default',
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
                  property: 'width',
                },
                value: [
                  {
                    type: 'function',
                    value: {
                      name: 's-container',
                      arguments: [
                        {
                          type: 'token',
                          value: {
                            type: 'ident',
                            value: 'width',
                          },
                        },
                        {
                          type: 'token',
                          value: {
                            type: 'comma',
                          },
                        },
                        {
                          type: 'token',
                          value: {
                            type: 'ident',
                            value: 'default',
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
            {
              property: 'margin',
              value: {
                top: {
                  type: 'length-percentage',
                  value: {
                    type: 'dimension',
                    value: {
                      unit: 'px',
                      value: 0,
                    },
                  },
                },
                right: {
                  type: 'auto',
                },
                bottom: {
                  type: 'length-percentage',
                  value: {
                    type: 'dimension',
                    value: {
                      unit: 'px',
                      value: 0,
                    },
                  },
                },
                left: {
                  type: 'auto',
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
