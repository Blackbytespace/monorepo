import { TSugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';

/**
 * @name            s-transition
 * @namespace       css.function
 * @type            Function
 * @platform        css
 * @status          stable
 *
 * This function allows you to apply a transition from the transitions registered ones.
 *
 * @param     {String}      name      The transition name you want to apply from registered ones
 * @return    {Css}                   The generated css
 *
 * @example         css
 * :root {
 *    --s-transition-slow: all, 0.3s, s-ease();
 *    --s-transition-default: all, 0.2s, s-ease();
 *    --s-transition-fast: all, 0.1s, s-ease();
 * }
 *
 * .my-element {
 *    transition: s-transition(slow);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */

export default function transition(
  value: any,
  settings: TSugarCssSettings,
): any {
  const args = {
    ...__parseArgs(value.arguments, ['name'], {
      separator: ['white-space', 'comma'],
    }),
  };
  args.values = {
    name: 'default',
    ...args.values,
  };

  const parts: string[] = [];
  parts.push(`var(--s-transition-${args.values.name}-duration, 0.3s)`);
  parts.push(`var(--s-transition-${args.values.name}-property, all)`);
  parts.push(
    `var(--s-transition-${args.values.name}-timing-function, ease-in-out)`,
  );
  parts.push(`var(--s-transition-${args.values.name}-delay, 0s)`);

  return {
    raw: parts.join(' '),
  };
}
