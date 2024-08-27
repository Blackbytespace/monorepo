import { env } from '../../sugarcss.js';

import { TSugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';

/**
 * @name            s-shade
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variable allows you to declare a color shade easily and use it in your css.
 * You can declare as many color shades as you want.
 *
 * @param      {String}        color                The color value to declare
 *
 * @example         css
 * :root {
 *    --s-shade-text: --lighten 20;
 *    --s-shade-text-main: --lighten 35;
 *    --s-shade-placeholder: --alpha 0.4;
 *    --s-shade-foreground: --lighten 50;
 *    --s-shade-background: --darken 40;
 *    --s-shade-surface: --darken 40;
 *    --s-shade-border: --alpha 0.2;
 *    --s-shade-hover: --lighten 40;
 *    --s-shade-active: --darken 10;
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

export default function share(v, settings: TSugarCssSettings): any {
  const shade = v.name.replace(`--s-shade-`, '');
  const args = __parseArgs(v.value);
  const result: any[] = [];

  // save in config
  let finalShade = {};
  for (let [arg, value] of Object.entries(args.values)) {
    if (typeof value === 'object') {
      finalShade = {
        ...finalShade,
        ...value,
      };
    }
  }
  const supportedModifiers = [
    'lighten',
    'darken',
    'saturate',
    'desaturate',
    'spin',
    'hue',
    'saturation',
    'lightness',
    'alpha',
  ];

  env.shades[shade] = finalShade;

  // custom css variables
  for (let key of supportedModifiers) {
    const value = finalShade[key] ?? 0;

    if (!value) {
      if (!['lighten', 'darken', 'saturate', 'desaturate'].includes(key)) {
        continue;
      }
    }

    result.push({
      property: `--s-shade-${shade}-${key}`,
      value: {
        name: `--s-shade-${shade}-${key}`,
        value: [
          {
            type: 'token',
            value: {
              type: 'number',
              value,
            },
          },
        ],
      },
    });
  }

  if (settings.verbose) {
    console.log(
      `Registered shade: <cyan>${shade}</cyan>: <yellow>${JSON.stringify(
        env.shades[shade],
        null,
      )}</yellow>`,
    );
  }

  return result;
}
