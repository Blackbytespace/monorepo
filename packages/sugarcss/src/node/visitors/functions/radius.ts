import { TSugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';

/**
 * @name            s-radius
 * @namespace       css.function
 * @type            Function
 * @platform        css
 * @status          stable
 *
 * This function allows you to apply a radius from the radiuses registered ones.
 *
 * @param      {String}        radius         The radius name you want to apply from registered ones
 * @return     {Css}                          The generated css
 *
 * @example         css
 * :root {
 *    --s-radius-default: 10px;
 *    --s-radius-special: 20px, 10px, 12px, 34px;
 * }
 *
 * .my-element {
 *    border-radius: s-radius();
 *    border-radius: s-radius(special);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@blackbyte.space)
 */

export default function radius(value: any, settings: TSugarCssSettings): any {
  const args = {
    ...__parseArgs(value.arguments, ['name'], {
      separator: ['white-space', 'comma'],
    }),
  };
  args.values = {
    name: 'default',
    ...args.values,
  };

  return {
    raw: `var(--s-radius-${args.values.name})`,
  };
}
