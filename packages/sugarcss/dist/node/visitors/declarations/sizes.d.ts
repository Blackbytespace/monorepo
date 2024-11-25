import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-sizes
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variable allows you to declare the sizes values to use in your css.
 * You can either declare a min and max size value and an easing function to be used when you
 * ask for a size value with a number.
 *
 * @param     {String}         min                The easing value for the min size
 * @param     {String}         max                The easing value for the max size
 * @param     {String}         [easing='linear']             The easing value for the size
 *
 * @example         css
 * :root {
 *      --s-sizes: 0 80px;
 * }
 *
 * .my-element {
 *    padding: s-size(10); // 80px / 100 * 10 = 8px
 *    padding: s-size(100); // 80px / 100 * 100 = 80px
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function sizes(v: any, settings: TSugarCssSettings): any;
