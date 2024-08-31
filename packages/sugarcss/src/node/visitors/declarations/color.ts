import { env } from '../../sugarcss.js';
import { TSugarCssSettings } from '../../sugarcss.types.js';

import { __convert } from '@lotsof/sugar/color';

/**
 * @name            s-color
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variable allows you to declare a color easily and use it in your css.
 * You can declare as many colors as you want.
 *
 * @param      {String}        color                The color value to declare
 *
 * @example         css
 * :root {
 *    --s-color-main: #ff0000;
 *    --s-color-main: #9e9161;
 *    --s-color-accent: #d2b02d;
 *    --s-color-complementary: #00f0ff;
 *    --s-color-ternary: #9ec468;
 * }
 *
 * .my-element {
 *   color: s-color(accent);
 *   color: s-color(accent, test);
 *   color: s-color(accent, --darken 20 --spin 30);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function color(v, settings: TSugarCssSettings): any {
  const name = v.name.replace(`--s-color-`, '').replace(/\-[a-z]$/, '');

  // if (env.colors[name]) {
  //   return;
  // }

  const result: any[] = [
    {
      property: `--s-color-${name}`,
      value: {
        name: `--s-color-${name}`,
        value: v.value,
      },
    },
    {
      property: `--s-color-${name}-o`,
      value: {
        name: `--s-color-${name}-o`,
        value: v.value,
      },
    },
  ];

  const hslaColor = __convert(v.value[0]?.value ?? v.value[0], 'hsla');
  env.colors[name] = hslaColor;

  ['h', 's', 'l', 'a'].forEach((key) => {
    result.push({
      property: `--s-color-${name}-${key}`,
      value: {
        name: `--s-color-${name}-${key}`,
        value: [
          {
            type: 'token',
            value: {
              type: 'number',
              value: hslaColor[key],
            },
          },
        ],
      },
    });
  });

  if (settings.verbose) {
    console.log(
      `Registered color: <cyan>${name}</cyan>: <yellow>${JSON.stringify(
        hslaColor,
      )}</yellow>`,
    );
  }

  return result;
}
