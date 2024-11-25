import { TSugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';

/**
 * @name            s-font
 * @namespace       css.function
 * @type            Function
 * @platform        css
 * @status          stable
 *
 * Apply a font from the fonts registered ones.
 * The supported fonts properties are:
 *
 * - `family`: The font family like "sans-serif", "serif", etc...
 * - `weight`: The font weight like "normal", "bold", etc...
 * - `style`: The font style like "normal", "italic", etc...
 * - `variant`: The font variant like "normal", "small-caps", etc...
 *
 * @param      {String}        font         The font name you want to apply from registered ones
 * @return     {Css}                        The generated css
 *
 * @example         css
 * :root {
 *   --s-font-...: "Roboto,sans-serif", %weight, %style, %variant;
 *   --s-font-family-code: "Fira Code", monospace;
 *   --s-font-code: s-font-family(code), 300;
 * }
 *
 * .my-element {
 *   font: s-font(code);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function font(value: any, settings: TSugarCssSettings): any {
  const args = __parseArgs(value.arguments, ['name']);

  const props: (string | number)[] = [];

  props.push(`var(--s-font-${args.values.name}-style, normal)`);
  props.push(`var(--s-font-${args.values.name}-variant, normal)`);
  props.push(`var(--s-font-${args.values.name}-weight, normal)`);
  props.push(
    `var(--s-font-${args.values.name}-size, 1em)/var(--s-font-${args.values.name}-line-height, 1.5em)`,
  );
  props.push(`var(--s-font-family-${args.values.name}, sans-serif)`);

  return {
    raw: props.join(' '),
  };
}
