import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-size
 * @namespace       css.function
 * @type            Function
 * @platform        css
 * @status          stable
 *
 * This function allows you to apply a size depending on the
 * min, max and easing function declared using the `--s-sizes` variable, or registered with
 * a custom name like --s-size-small, --s-size-medium, etc...
 *
 * @param      {Number|String}        ...size         The size(s) you want to apply
 * @param      {Boolean}              [scalable=true]     Specify if you want the size(s) to be scalable or not
 * @return     {Css}                        The generated css
 *
 * @example         css
 * :root {
 *      /* Define min, max and a easing function * /
 *      --s-sizes: 0 80px;
 *
 *      /* Define named sizes * /
 *      --s-size-small: 10px;
 *      --s-size-medium: 20px;
 *      --s-size-large: 40px;
 * }
 *
 * .my-element {
 *    padding: s-size(10); // 80px / 100 * 10 = 8px
 *    padding: s-size(100); // 80px / 100 * 100 = 80px
 *    padding: s-size(small); // 10px
 *    padding: s-size(medium); // 20px
 *    padding: s-size(large); // 40px
 *    padding: s-space(10 false); // not scalable
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function size(value: any, settings: TSugarCssSettings): any;
