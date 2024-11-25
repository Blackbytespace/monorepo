import { __camelCase } from '@lotsof/sugar/string';
import { env } from '../../sugarcss.js';
import { TSugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';
import __toRem from '../../utils/toRem.js';

/**
 * @name            s-spaces
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variable allows you to declare the spaces values to use in your css.
 * You can either declare a min and max space value and an easing function to be used when you
 * ask for a space value with a number.
 *
 * @param     {String}         min                The easing value for the min space
 * @param     {String}         max                The easing value for the max space
 * @param     {String}         [easing='linear']             The easing value for the space
 *
 * @example         css
 * :root {
 *      --s-spaces: 0 80px;
 * }
 *
 * .my-element {
 *    padding: s-space(10); // 80px / 100 * 10 = 8px
 *    padding: s-space(100); // 80px / 100 * 100 = 80px
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */

export default function spaces(v, settings: TSugarCssSettings): any {
  const args = __parseArgs(v.value, ['min', 'max', 'easing'], {
    separator: ['white-space', 'comma'],
  });

  const result: any[] = [];

  let value = args.values;
  if (value.easing) {
    value.easing = __camelCase(value.easing);
  }

  // save in config
  env.spaces = value;

  // custom css variables
  for (let [key, value] of Object.entries(args.ast)) {
    const finalValue = __toRem(value);
    result.push({
      property: `--s-spaces-${key}`,
      value: {
        name: `--s-spaces-${key}`,
        value: [finalValue],
      },
    });
  }

  if (settings.verbose) {
    console.log(
      `Registered spaces settings: <yellow>${JSON.stringify({
        min: value.min,
        max: value.max,
        easing: value.easing,
      })}</yellow>`,
    );
  }

  return result;
}
