import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-spaces
 * @namespace       css.function
 * @type            Function
 * @platform        css
 * @status          stable
 *
 * This function allows you to apply a space depending on the
 * min, max and easing function declared using the `--s-spaces` variable, or registered with
 * a custom name like --s-space-small, --s-space-medium, etc...
 *
 * @param      {Number|String}        ...space         The space(s) you want to apply
 * @param      {Boolean}              [scalable=true]     Specify if you want the space(s) to be scalable or not
 * @return     {Css}                        The generated css
 *
 * @example         css
 * :root {
 *      /* Define min, max and a easing function * /
 *      --s-spaces: 0 80px;
 *
 *      /* Define named spaces * /
 *      --s-spaces-small: 10px;
 *      --s-spaces-medium: 20px;
 *      --s-spaces-large: 40px;
 * }
 *
 * .my-element {
 *    padding: s-space(10); // 80px / 100 * 10 = 8px
 *    padding: s-space(100); // 80px / 100 * 100 = 80px
 *    padding: s-space(small); // 10px
 *    padding: s-space(medium); // 20px
 *    padding: s-space(large); // 40px
 *    padding: s-space(10 false); // not scalable
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function space(value: any, settings: TSugarCssSettings): any;
