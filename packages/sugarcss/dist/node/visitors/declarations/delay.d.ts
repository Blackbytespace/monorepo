import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-delay
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variable allows you to register some delays values that can be used later using the
 * `s-delay` function. You can pass then another time value that will be added to the registered delay.
 * Accepted unit is `s`.
 *
 * @param     {String}         delay                The delay to register like `200ms`
 *
 * @example         css
 * :root {
 *    --s-delay-default: 0.2s;
 *    --s-delay-in-viewport: 1s;
 * }
 *
 * .my-element {
 *     transition-delay: s-delay(); // 0.2s
 *     transition-delay: s-delay(in-viewport); // 1s
 *     transition-delay: s-delay(in-viewport, 0.5s); // 1.5s
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function grid(v: any, settings: TSugarCssSettings): any;
