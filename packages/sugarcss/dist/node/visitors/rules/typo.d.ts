import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-typo
 * @namespace       css.rule
 * @type            AtRule
 * @platform        css
 * @status          stable
 *
 * This rule allows you to apply a registered typography easily with all his properties like:
 * - `font`: The font to use from the registered ones
 * - `size`: The font size to use
 * - `line-height`: The line height to use
 * - `letter-spacing`: The letter spacing to use
 * - `text-transform`: The text transform to use
 * - `text-decoration`: The text decoration to use
 *
 * @param      {String}        name                 The typo name you want to apply
 * @return     {Css}                                The generated css
 *
 * @snippet       @s-typo($1);
 *
 * @example         css
 * :root {
 *    --s-typo-h1: s-font(sans) s-size(h1) 1.4 0;
 * }
 *
 * .my-element {
 *      @s-font(h1);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function typo(v: any, settings: TSugarCssSettings): any;
