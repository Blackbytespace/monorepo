import { ISugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-size
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variable allows you to register a size value that you can use in your css easily.
 * You can register as many size as you want.
 *
 * @param    {String}         size                The easing value for the size
 *
 * @example         css
 * :root {
 *    --s-font-default: s-font-family(sans) 16px 26px;
 *    --s-font-lead: s-font-family(sans) 26px 40px;
 *    --s-font-title: VT323 s-size(100) s-size(100) 300;
 *    --s-font-code: s-font-family(code) 16px 26px 300;
 * }
 *
 * .my-element {
 *    font: s-font(default);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function size(v: any, settings: ISugarCssSettings): any;
