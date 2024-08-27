import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-grid
 * @namespace       css.rule
 * @type            AtRule
 * @platform        css
 * @status          stable
 *
 * This rule allows you to apply a grid layout easily.
 * You can either apply a registered grid, or directly
 * pass the grid layout you want to apply.
 *
 * @param       {String}        nameOrLayout            The grid name you want to apply or directly the grid layout like `1 1 2 _ 3 3 3`
 * @param       {Number}        [gap=0]                 The gap you want to apply between each grid cell
 * @return      {Css}                                   The generated css
 *
 * @example         css
 * :root {
 *    --s-grid-default: 1 1 2 _ 3 3 3;
 *    --s-grid-2cols: 1 2;
 * }
 *
 * .my-element {
 *    @s-grid(2cols);
 *
 *   // or with an inline layout
 *   @s-grid('1 1 2 _ 3 3 3', 20px);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function grid(v: any, settings: TSugarCssSettings): any;
