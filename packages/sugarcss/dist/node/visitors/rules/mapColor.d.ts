import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-map-color
 * @namespace       css.rule
 * @type            AtRule
 * @platform        css
 * @status          stable
 *
 * This rule allows you to remap a color with a new one.
 * This is useful when using the `current` coloe in your components.
 * You can then change it by using this rule like this: `@s-map-color(complementary, current);`.
 * This will set the `current` color to the `complementary` one.
 *
 * @param       {String}        name              The color name you want to map
 * @param       {String}        to                The color name you want to map to
 * @return      {Css}                             The generated css
 *
 * @snippet       @s-map-color($1, $2);
 *
 * @example         css
 * :root {
 *    --s-color-accent: #ff0000;
 *    --s-color-complementary: #00ff00;
 *    --s-color-current: #0000ff;
 * }
 *
 * .my-element {
 *    ._title {
 *       color: s-color(current);
 *    }
 *
 *    &.-error {
 *      @s-map-color(complementary)
 *    }
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function color(v: any, settings: TSugarCssSettings): any;
