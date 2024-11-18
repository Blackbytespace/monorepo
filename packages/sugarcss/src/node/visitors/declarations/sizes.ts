import { __camelCase } from '@lotsof/sugar/string';
import { env } from '../../sugarcss.js';
import { TSugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';

/**
 * @name            s-sizes
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variable allows you to register a size value that you can use in your css easily.
 * You can register as many size as you want.
 *
 * @param     {String}         min                The easing value for the min size
 * @param     {String}         max                The easing value for the max size
 * @param     {String}         [easing='linear']             The easing value for the size
 *
 * @example         css
 * :root {
 *      /* Define min, max and a easing function * /
 *      --s-sizes: 0 80px;
 *
 *      /* Define named sizes * /
 *      --s-size-small: 10px;
 *      --s-size-medium: 20px;
 *      --s-size-large: 40px;
 * }
 *
 * .my-element {
 *    padding: s-size(10); // 80px / 100 * 10 = 8px
 *    padding: s-size(100); // 80px / 100 * 100 = 80px
 *    padding: s-size(small); // 10px
 *    padding: s-size(medium); // 20px
 *    padding: s-size(large); // 40px
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */

export default function sizes(v, settings: TSugarCssSettings): any {
  const args = __parseArgs(v.value, ['min', 'max', 'easing'], {
    separator: ['white-space', 'comma'],
  });

  const result: any[] = [];

  let value = args.values;
  if (value.easing) {
    value.easing = __camelCase(value.easing);
  }

  // save in config
  env.sizes = value;

  // custom css variables
  for (let [key, value] of Object.entries(args.ast)) {
    result.push({
      property: `--s-sizes-${key}`,
      value: {
        name: `--s-sizes-${key}`,
        value: [value],
      },
    });
  }

  if (settings.verbose) {
    console.log(
      `Registered sizes settings: <yellow>${JSON.stringify(
        env.sizes,
      )}</yellow>`,
    );
  }

  return result;
}
