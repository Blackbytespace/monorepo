import { TSugarCssSettings } from '../../sugarcss.types.js';
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
 * @param      {String}        color                The color value to declare
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
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function ease(v: any, settings: TSugarCssSettings): any;
