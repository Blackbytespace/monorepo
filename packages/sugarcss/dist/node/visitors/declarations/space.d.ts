import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-space
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variables allows you to register a space value that you can use in your css easily.
 * through the s-space() function.
 * You can register as many space as you want.
 *
 * @param           {Number}       value            The value to register for your space
 *
 * @example         css
 * :root { *
 *      --s-space-small: 10px;
 *      --s-space-medium: 20px;
 *      --s-space-large: 40px;
 * }
 *
 * .my-element {
 *    padding: s-space(small); // 10px
 *    padding: s-space(medium); // 20px
 *    padding: s-space(large); // 40px
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function space(v: any, settings: TSugarCssSettings): any;
