import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-transition
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variable allows you to register a transition value that you can use in your css easily.
 * You can register as many transition as you want.
 *
 * @param     {String}         min                The easing value for the min size
 * @param     {String}         max                The easing value for the max size
 * @param     {String}         [easing='linear']             The easing value for the size
 *
 * @example         css
 * :root {
 *    --s-transition-slow: all 0.3s s-ease();
 *    --s-transition-default: all 0.2s s-ease();
 *    --s-transition-fast: all 0.1s s-ease();
 * }
 *
 * .my-element {
 *    transition: s-transition(slow);
 *
 *    // or using a mixin
 *    @s-transition(default);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function transition(v: any, settings: TSugarCssSettings): any;
