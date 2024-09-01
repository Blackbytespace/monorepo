import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-container
 * @namespace       css.function
 * @type            Function
 * @platform        css
 * @status          stable
 *
 * Allow to get some container related properties like:
 *
 * - `width`: The calculated container width relative to the `--s-container-max-width` and the `--s-container-side-padding` variables
 * - `minWidth` (`min-width`): The min width of the container
 * - `maxWidth` (`max-width`): The max width of the container
 * - `sidePadding` (`side-padding`): The side padding of the container
 *
 * @param      {String}        prop         The container property wanted
 * @return     {Css}                        The generated css
 *
 * @example         css
 * :root {
 *    --s-container-default: 320px, 1200px, 20px;
 * }
 *
 * .my-element {
 *    width: s-container(width);
 *
 *    min-width: s-container(minWidth);
 *    max-width: s-container(maxWidth);
 *    padding-left: s-container(sidePadding);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function container(value: any, settings: TSugarCssSettings): any;
