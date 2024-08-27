import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-spaces
 * @namespace       css.function
 * @type            Function
 * @platform        css
 * @status          stable
 *
 * This function allows you to apply a space depending on the
 * min, max and easing function declared using the `--s-spaces` variable.
 *
 * @param      {Number}        size         The space you want to apply between 0 and 100
 * @return     {Css}                        The generated css
 *
 * @example         css
 * :root {
 *      --s-spaces: 0 80px linear;
 * }
 *
 * .my-element {
 *    padding: s-space(10); // 8px
 *    padding: s-space(20); // 16px
 *    padding: s-space(100); // 80px
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function space(value: any, settings: TSugarCssSettings): any;
