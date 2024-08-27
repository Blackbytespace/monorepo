import { ISugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-layout
 * @namespace       css.function
 * @type            Function
 * @platform        css
 * @status          stable
 *
 * Allow to get some layout related properties like:
 *
 * - `width`: The calculated layout width relative to the `--s-layout-max-width` and the `--s-layout-side-padding` variables
 * - `minWidth`: The min width of the layout
 * - `maxWidth`: The max width of the layout
 * - `sidePadding`: The side padding of the layout
 *
 * @param      {String}        prop         The layout property wanted
 * @return     {Css}                        The generated css
 *
 * @example         css
 * :root {
 *    // min-width max-width side-padding
 *    --s-layout-default: 320px 1200px 20px;
 * }
 *
 * .my-element {
 *    width: s-layout(width);
 *
 *    min-width: s-layout(minWidth);
 *    max-width: s-layout(maxWidth);
 *    padding-left: s-layout(sidePadding);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function layout(value: any, settings: ISugarCssSettings): any;
