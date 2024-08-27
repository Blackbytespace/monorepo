import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-container
 * @namespace       css.rule
 * @type            AtRule
 * @platform        css
 * @status          stable
 *
 * This rule allows you to make the element a container easily.
 * The container width if relative to the `--s-container-max-width`
 * and the `--s-container-side-padding` variables
 *
 * @param       {String}        [container=default]                   The container you want to apply to the container. Can be any registered container
 * @return     {Css}                              The generated css
 *
 * @snippet       @s-container($1);
 *
 * @example         css
 * :root {
 *    // min-width max-width side-padding
 *    --s-container-default: 320px 1200px 20px;
 *    --s-container-full: 0 100% 20px;
 * }
 *
 * .my-element {
 *      @s-container();
 *      @s-container(full);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function container(v: any, settings: TSugarCssSettings): any;
