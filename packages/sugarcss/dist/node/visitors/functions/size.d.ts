import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-size
 * @namespace       css.function
 * @type            Function
 * @platform        css
 * @status          stable
 *
 * This function allows you to apply a size depending on the
 * min, max and easing function declared using the `--s-sizes` variable.
 *
 * @param      {Number}        size         The size you want to apply between 0 and 100
 * @return     {Css}                        The generated css
 *
 * @example         css
 * :root {
 *      --s-sizes: 0px, 80px;
 * }
 *
 * .my-element {
 *    font-size: s-size(10); // 8px
 *    font-size: s-size(20); // 16px
 *    font-size: s-size(100); // 80px
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function size(value: any, settings: TSugarCssSettings): any;
