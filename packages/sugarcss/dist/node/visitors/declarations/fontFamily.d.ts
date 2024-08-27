import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-font-family
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variable allows you to declare a font family easily and use it in your css.
 * You can declare as many font families as you want.
 *
 * @param     {String}        family                The font family to use
 *
 * @example         css
 * :root {
 *    --s-font-family-sans: 'Roboto', sans-serif;
 *    --s-font-family-serif: 'Merriweather', serif;
 *    --s-font-family-code: 'Monaco', sans-serif;
 *    --s-font-family-quote: 'Palatino', serif;
 * }
 *
 * .my-element {
 *    font-family: s-font-family(code);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function fontFamily(v: any, settings: TSugarCssSettings): any;
