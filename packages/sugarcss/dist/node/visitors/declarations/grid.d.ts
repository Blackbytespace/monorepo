import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-grid
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variable allows you to register some grid layouts that you can use in your css.
 * You can register as many grid as you want like in the example below.
 *
 * @param      {String}         layout                The grid layout to register like `1 1 2 _ 3 3 3`
 *
 * @example         css
 * :root {
 *    --s-grid-default: 1 1 2 _ 3 3 3;
 *    --s-grid-2cols: 1 2;
 * }
 *
 * .my-element {
 *    @s-grid(default);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function grid(v: any, settings: TSugarCssSettings): any;
