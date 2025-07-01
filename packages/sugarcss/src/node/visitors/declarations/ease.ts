import { TSugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';

/**
 * @name            s-ease
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variable allows you to declare an easing function easily and use it in your css.
 * You can declare as many easings as you want.
 *
 * @param      {String}        easing                The easing you want to declare
 *
 * @example         css
 * :root {
 *    --s-ease-default: cubic-bezier(0.745, 0, 0.18, 1);
 * }
 *
 * .my-element {
 *    transition: all 0.3s s-ease(default);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@blackbyte.space)
 */
export default function ease(v, settings: TSugarCssSettings): any {
  const name = v.name.replace(`--s-ease-`, ''),
    args = __parseArgs(v.value, ['function'], {
      separator: ['white-space', 'comma'],
    });

  const result: any[] = [];

  // custom css variables
  if (args.ast.function) {
    result.push({
      property: `--s-ease-${name}`,
      value: {
        name: `--s-ease-${name}`,
        value: [args.ast.function],
      },
    });
  }

  if (settings.verbose) {
    console.log(
      `Registered ease: <cyan>${name}</cyan>: <yellow>${JSON.stringify(
        args.values,
      )}</yellow>`,
    );
  }

  return result;
}
