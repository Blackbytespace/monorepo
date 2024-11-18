import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-spaces
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variable allows you to declare the spaces values to use in your css.
 * You can either declare a min and max space value and an easing function to be used when you
 * ask for a space value with a number.
 *
 * @param     {String}         min                The easing value for the min space
 * @param     {String}         max                The easing value for the max space
 * @param     {String}         [easing='linear']             The easing value for the space
 *
 * @example         css
 * :root {
 *      --s-spaces: 0 80px;
 * }
 *
 * .my-element {
 *    padding: s-space(10); // 80px / 100 * 10 = 8px
 *    padding: s-space(100); // 80px / 100 * 100 = 80px
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function spaces(v: any, settings: TSugarCssSettings): any;
