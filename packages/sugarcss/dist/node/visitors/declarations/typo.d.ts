import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-typo
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variable allows you to declare a typography easily and use it in your css.
 * You can declare as many typos as you want.
 *
 * @param     {String}        font                      The font to use from the registered ones
 * @param     {Number}        [size=1em]               The font size to use
 * @param     {Number}        [line-height=1]           The line height to use
 * @param     {Number}        [letterSpacing=0]         The letter spacing to use
 *
 * @example         css
 * :root {
 *   --s-typo-h1: s-font(title) s-size(h1) 1.4 0;
 *   --s-typo-h2: s-font(title) s-size(h2) 1.2 0;
 *   --s-typo-p: s-font(default) s-size(p) 1.4 0;
 * }
 *
 * .my-element {
 *    @s-typo(h1);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function typo(v: any, settings: TSugarCssSettings): any;
