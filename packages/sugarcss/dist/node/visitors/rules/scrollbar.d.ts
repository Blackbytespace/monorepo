import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-scrollbar
 * @namespace       css.rule
 * @type            AtRule
 * @platform        css
 * @status          stable
 *
 * This rule allows you to style the scrollbar of an element or to hide it completely.
 *
 * @param      {String}        sizeOrHide        The size of the scrollbar or "hide" to hide it
 * @param      {String}        thumbColor        The thumb color
 * @param      {String}        trackColor        The track color
 * @return     {Css}                             The generated css
 *
 * @snippet       @s-scrollbar($1, $2, $3);
 *
 * @example         css
 * .my-element {
 *      @s-scrollbar(10px, s-color(accent), s-color(accent, --darken 20));
 *      @s-scrollbar(hide);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function scrollbar(v: any, settings: TSugarCssSettings): any;
