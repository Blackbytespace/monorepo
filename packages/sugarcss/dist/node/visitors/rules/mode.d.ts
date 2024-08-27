import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-mode
 * @namespace       css.rule
 * @type            AtRule
 * @platform        css
 * @status          stable
 *
 * This function allows you to define some dark/light mode styles easily.
 *
 * @param       {String}        mode              The mode to target
 * @return     {Css}                              The generated css
 *
 * @snippet       @s-mode($1);
 *
 * @example         css
 * :root {
 *    --s-color-accent: red;
 *
 *    @s-mode dark {
 *       --s-color-accent: blue;
 *    }
 * }
 *
 * .my-element {
 *     color: red;
 *
 *     @s-mode dark {
 *        color: blue;
 *     }
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function mode(v: any, settings: TSugarCssSettings): any;
