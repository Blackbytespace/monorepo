import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-setting
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variable allows you to override default settings easily directly into your css.
 *
 * @param      {String}        value                The setting value to set
 *
 * @example         css
 * :root {
 *    --s-setting-mobile-first: true;
 *    --s-setting-verbose: false;
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@lotsof.dev)
 */
export default function setting(v: any, settings: TSugarCssSettings): any;
