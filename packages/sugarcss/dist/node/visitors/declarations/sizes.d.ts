import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-sizes
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variable allows you to register a size value that you can use in your css easily.
 * You can register as many size as you want.
 *
 * @param     {String}         min                The easing value for the min size
 * @param     {String}         max                The easing value for the max size
 * @param     {String}         [easing='linear']             The easing value for the size
 *
 * @example         css
 * :root {
 *      --s-sizes: 0px 80px linear;
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
export default function sizes(v: any, settings: TSugarCssSettings): any;
