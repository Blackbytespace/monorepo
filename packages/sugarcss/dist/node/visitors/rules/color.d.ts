import { ISugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-radius
 * @namespace       css.rule
 * @type            AtRule
 * @platform        css
 * @status          stable
 *
 * This declaration allows you to apply a registered raius easily.
 * To be able to use this, you need to register at least 1 radius like in the example below:
 *
 * @param      {String}        name              The transition name you want to apply
 * @return     {Css}                              The generated css
 *
 * @snippet       @s-radius($1);
 *
 * @example         css
 * :root {
 *    --s-radius-default: 10px;
 *    --s-radius-special: 20px 10px 12px 34px;
 * }
 *
 * .my-element {
 *      @s-radius();
 * }
 *
 * .my-other-element {
 *     @s-radius(special);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function color(v: any, settings: ISugarCssSettings): any;
