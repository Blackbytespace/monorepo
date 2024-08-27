import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-transition
 * @namespace       css.function
 * @type            Function
 * @platform        css
 * @status          stable
 *
 * This function allows you to apply a transition from the transitions registered ones.
 *
 * @param     {String}      name      The transition name you want to apply from registered ones
 * @return    {Css}                   The generated css
 *
 * @example         css
 * :root {
 *    --s-transition-slow: all 0.3s s-easing();
 *    --s-transition-default: all 0.2s s-easing();
 *    --s-transition-fast: all 0.1s s-easing();
 * }
 *
 * .my-element {
 *    transition: s-transition(slow);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function transition(value: any, settings: TSugarCssSettings): any;
