import { TSugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';

/**
 * @name            s-font-family
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variable allows you to declare a font family easily and use it in your css.
 * You can declare as many font families as you want.
 *
 * @param     {String}        family                The font family to use
 *
 * @example         css
 * :root {
 *    --s-font-family-sans: 'Roboto', sans-serif;
 *    --s-font-family-serif: 'Merriweather', serif;
 *    --s-font-family-code: 'Monaco', sans-serif;
 *    --s-font-family-quote: 'Palatino', serif;
 * }
 *
 * .my-element {
 *    font-family: s-font-family(code);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@blackbyte.space)
 */

export default function fontFamily(v, settings: TSugarCssSettings): any {
  const name = v.name.replace(`--s-font-family-`, '');

  const args = __parseArgs(v.value, [], {
    separator: ['white-space', 'comma'],
  });

  const result: any[] = [];
  const tokens: any[] = [];

  for (let [key, value] of Object.entries(args.values)) {
    tokens.push({
      type: 'token',
      value: {
        type: 'ident',
        value: value,
      },
    });
    tokens.push({
      type: 'token',
      value: {
        type: 'comma',
      },
    });
  }

  // remove the last comma
  tokens.pop();

  // custom css variables
  result.push({
    property: `--s-font-family-${name}`,
    value: {
      name: `--s-font-family-${name}`,
      value: tokens,
    },
  });

  if (settings.verbose) {
    console.log(`Registered font family: <cyan>${name}</cyan>`);
  }

  return result;
}
