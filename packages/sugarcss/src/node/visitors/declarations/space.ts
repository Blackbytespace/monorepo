import { TSugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';
import __toRem from '../../utils/toRem.js';

/**
 * @name            s-space
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variables allows you to register a space value that you can use in your css easily.
 * through the s-space() function.
 * You can register as many space as you want.
 *
 * @param           {Number}       value            The value to register for your space
 *
 * @example         css
 * :root { *
 *      --s-space-small: 10px;
 *      --s-space-medium: 20px;
 *      --s-space-large: 40px;
 * }
 *
 * .my-element {
 *    padding: s-space(small); // 10px
 *    padding: s-space(medium); // 20px
 *    padding: s-space(large); // 40px
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@blackbyte.space)
 */

export default function space(v, settings: TSugarCssSettings): any {
  const name = v.name.replace(`--s-space-`, '').replace(/\-[a-z]$/, '');
  const args = __parseArgs(v.value, ['value'], {
    separator: ['white-space', 'comma'],
  });

  const result: any[] = [];

  let value = args.values;

  result.push({
    property: `--s-space-${name}`,
    value: {
      name: `--s-space-${name}`,
      value: [
        typeof value.value === 'string'
          ? args.ast.value
          : __toRem({
              type: 'length',
              value: {
                unit: 'px',
                value: value.value,
              },
            }),
      ],
    },
  });

  if (settings.verbose) {
    console.log(
      `Registered space: <yellow>${JSON.stringify({
        name,
        value: value.value,
      })}</yellow>`,
    );
  }

  return result;
}
