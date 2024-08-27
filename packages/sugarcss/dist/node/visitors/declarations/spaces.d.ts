import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-spaces
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variable allows you to declare the spaces values to use in your css.
 * You can declare as many spaces as you want.
 *
 * @param     {String}         min                The easing value for the min space
 * @param     {String}         max                The easing value for the max space
 * @param     {String}         [easing='linear']             The easing value for the space
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
export default function spaces(v: any, settings: TSugarCssSettings): any;
