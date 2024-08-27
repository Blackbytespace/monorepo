import { ISugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-layout
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * The layout variables allows you to specify some layout related variables like the max-width, side padding, etc...
 *
 * @param      {String}        minWidth             The min width of the layout
 * @param      {String}        maxWidth             The max width of the layout
 * @param      {String}        sidePadding          The side padding of the layout
 *
 * @example         css
 * :root {
 *    // min-width max-width side-padding
 *    --s-layout-default: 320px 1200px 20px;
 * }
 *
 * .my-element {
 *      @s-container();
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function layout(v: any, settings: ISugarCssSettings): any;
