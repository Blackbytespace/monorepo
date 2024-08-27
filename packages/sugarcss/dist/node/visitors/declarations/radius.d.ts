import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-radius
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variable allows you to declare a radius easily and use it in your css.
 * You can declare as many radius as you want.
 *
 * @param    {String}         topLeftOrAll          The top left radius value or the same value for all corners
 * @param    {String}         [topRight=null]              The top right radius value
 * @param    {String}         [bottomRight=null]              The bottom right radius value
 * @param    {String}         [bottomLeft=null]              The bottom left radius value
 *
 * @example         css
 * :root {
 *    --s-radius-default: 10px;
 *    --s-radius-special: 20px 10px 12px 34px;
 * }
 *
 * .my-element {
 *    border-radius: s-radius();
 *    border-radius: s-radius(special);
 *
 *   // or using a mixin
 *   @s-radius(special);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function radius(v: any, settings: TSugarCssSettings): any;
