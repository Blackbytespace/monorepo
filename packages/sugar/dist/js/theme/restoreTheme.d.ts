/**
 * @name            restoreTheme
 * @namespace       js.theme
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * This function allows you to restore the theme set on the website/application through
 * the `setTheme` function.
 *
 * @param           {String}          defaultTheme        The default theme to set if no theme has been set
 * @param           {TRestoreThemeSettings}          [settings={}]         Some settings to configure your theme restoration
 *
 * @setting         {String}          [cookieName='theme']         The cookie name to use to store the theme
 *
 * @todo      tests
 *
 * @snippet         __setTheme($1)
 *
 * @example         js
 * import { __setTheme } from '@lotsof/sugar/theme';
 * __setTheme('dark');
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export type TRestoreThemeSettings = {
    cookieName: string;
};
export default function setTheme(defaultTheme: string, settings?: TRestoreThemeSettings): void;
