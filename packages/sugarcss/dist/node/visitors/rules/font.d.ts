import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-font
 * @namespace       css.rule
 * @type            AtRule
 * @platform        css
 * @status          stable
 *
 * This rule allows you to apply a registered font easily with all his properties like:
 * - `family`: The font family like "sans-serif", "serif", etc...
 * - `weight`: The font weight like "normal", "bold", etc...
 * - `style`: The font style like "normal", "italic", etc...
 * - `variant`: The font variant like "normal", "small-caps", etc...
 * - `letter-spacing`: The font letter spacing like "normal", "0.1em", etc...
 *
 * @param      {String}        name              The font name you want to apply
 * @return     {Css}                              The generated css
 *
 * @snippet       @s-font($1);
 *
 * @example         css
 * :root {
 *    --s-font-title: VT323 600 normal normal 0.1em;
 * }
 *
 * .my-element {
 *      @s-font(title);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function font(v: any, settings: TSugarCssSettings): any;
