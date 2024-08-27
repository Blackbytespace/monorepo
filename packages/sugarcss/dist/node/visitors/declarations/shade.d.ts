import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-shade
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variable allows you to declare a color shade easily and use it in your css.
 * You can declare as many color shades as you want.
 *
 * @param      {String}        color                The color value to declare
 *
 * @example         css
 * :root {
 *    --s-shade-text: --lighten 20;
 *    --s-shade-text-main: --lighten 35;
 *    --s-shade-placeholder: --alpha 0.4;
 *    --s-shade-foreground: --lighten 50;
 *    --s-shade-background: --darken 40;
 *    --s-shade-surface: --darken 40;
 *    --s-shade-border: --alpha 0.2;
 *    --s-shade-hover: --lighten 40;
 *    --s-shade-active: --darken 10;
 * }
 *
 * .my-element {
 *   color: s-color(accent);
 *   color: s-color(accent, test);
 *   color: s-color(accent, --darken 20 --spin 30);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function share(v: any, settings: TSugarCssSettings): any;
