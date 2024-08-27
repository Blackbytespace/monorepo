import { env } from '../../sugarcss.js';
import { TSugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';

/**
 * @name            s-transition
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variable allows you to register a transition value that you can use in your css easily.
 * You can register as many transition as you want.
 *
 * @param     {String}         min                The easing value for the min size
 * @param     {String}         max                The easing value for the max size
 * @param     {String}         [easing='linear']             The easing value for the size
 *
 * @example         css
 * :root {
 *    --s-transition-slow: all 0.3s s-easing();
 *    --s-transition-default: all 0.2s s-easing();
 *    --s-transition-fast: all 0.1s s-easing();
 * }
 *
 * .my-element {
 *    transition: s-transition(slow);
 *
 *    // or using a mixin
 *    @s-transition(default);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */

export default function transition(v, settings: TSugarCssSettings): any {
  const name = v.name.replace(`--s-transition-`, ''),
    args = __parseArgs(
      v.value,
      ['property', 'duration', 'easing', 'delay', 'behavior'],
      {
        separator: ['white-space', 'comma'],
      },
    );

  const result: any[] = [];

  // save in env
  env.transitions[name] = {
    ...args.values,
    ast: v,
  };

  // custom css variables
  for (let [key, value] of Object.entries(args.ast)) {
    result.push({
      property: `--s-transition-${name}-${key}`,
      value: {
        name: `--s-transition-${name}-${key}`,
        value: [value],
      },
    });
  }

  if (settings.verbose) {
    console.log(
      `Registered transition: <cyan>${name}</cyan>: <yellow>${JSON.stringify(
        args.values,
      )}</yellow>`,
    );
  }

  return result;
}
