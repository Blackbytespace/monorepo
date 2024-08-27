import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-fit
 * @namespace       css.rule
 * @type            AtRule
 * @platform        css
 * @status          stable
 *
 * This rule allows you to make the element fit the parent element easily.
 * You can choose the `position` you want as well as if you want to `center` the element
 * using `left: 50%`, `top: 50%` and `transform: translate(-50%, -50%)`.
 *
 * @param      {String}        [position=absolute]              The position you want to apply to the element. Can be `absolute`, `abs`, `relative`, `rel`, `fixed` or `fix`
 * @param       {Boolean}       [center=false]                   If you want to center the element with `left: 50%`, `top: 50%` and `transform: translate(-50%, -50%)`
 * @return     {Css}                              The generated css
 *
 * @snippet       @s-fit($1, $2);
 *
 * @example         css
 * .my-element {
 *      @s-fit();
 *      @s-fit(fixed);
 *      @s-fit(abs, true);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function fit(v: any, settings: TSugarCssSettings): any;
