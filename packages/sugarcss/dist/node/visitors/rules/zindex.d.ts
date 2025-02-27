import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-zindex
 * @namespace       css.rule
 * @type            Function
 * @platform        css
 * @status          stable
 *
 * This rule allows you to apply a z-index value from the registered z-indexes in the config.
 *
 * @param       {String}        name             The z-index name you want to get from the config
 * @param       {Number}        [offset=0]       An offset to apply to the z-index value
 * @return     {Css}                             The generated css
 *
 * @example         css
 * :root {
 *    --s-zindex-header: 100;
 *    --s-zindex-chatbot: 200;
 * }
 *
 * .my-element {
 *    @s-zindex(header); // z-index: 200;
 *    @s-zindex(chatbot); // z-index: 200;
 *    @s-zindex(header, -1); // z-index: 199;
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function zindex(v: any, settings: TSugarCssSettings): any;
