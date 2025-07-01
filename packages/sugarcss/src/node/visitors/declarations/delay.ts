import { TSugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';

/**
 * @name            s-delay
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variable allows you to register some delays values that can be used later using the
 * `s-delay` function. You can pass then another time value that will be added to the registered delay.
 * Accepted unit is `s`.
 *
 * @param     {String}         delay                The delay to register like `200ms`
 *
 * @example         css
 * :root {
 *    --s-delay-default: 0.2s;
 *    --s-delay-in-viewport: 1s;
 * }
 *
 * .my-element {
 *     transition-delay: s-delay(); // 0.2s
 *     transition-delay: s-delay(in-viewport); // 1s
 *     transition-delay: s-delay(in-viewport, 0.5s); // 1.5s
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@blackbyte.space)
 */

export default function grid(v, settings: TSugarCssSettings): any {
  const name = v.name.replace(`--s-delay-`, ''),
    args = __parseArgs(v.value, ['delay'], {
      separator: ['white-space', 'comma'],
    });

  const result: any[] = [];

  // custom css variables
  result.push({
    property: `--s-delay-${name}`,
    value: {
      name: `--s-delay-${name}`,
      value: [args.ast.delay],
    },
  });

  if (settings.verbose) {
    console.log(
      `Registered delay <cyan>${name}</cyan>: <yellow>${JSON.stringify(
        args.values.delay,
      )}</yellow>`,
    );
  }

  return result;
}
