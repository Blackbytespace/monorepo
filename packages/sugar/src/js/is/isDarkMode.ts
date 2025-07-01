import { __querySelectorUp } from '@blackbyte/sugar/dom';

/**
 * @name        isDarkMode
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        stable
 *
 * Detect if the user prefer the dark mode.
 * If you pass a "rootNode", it will check by querying up the DOM if an element
 * has the class `-dark` on it.
 *
 * @return    {Boolean}    true if prefer dark mode, false if not
 *
 * @todo      tests
 *
 * @snippet         __isDarkMode()
 *
 * @example 	js
 * import { __isDarkMode } from '@blackbyte/sugar/is'
 * if ( __isDarkMode()) {
 *   // do something cool
 * }
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export type TIsDarkModeSettings = {
  ctx: Window;
  rootNode?: HTMLElement;
};

export default function __isDarkMode(
  settings?: Partial<TIsDarkModeSettings>,
): boolean {
  const finalSettings: TIsDarkModeSettings = {
    ctx: window,
    ...(settings ?? {}),
  };

  if (finalSettings.rootNode) {
    if (finalSettings.rootNode.classList.contains('-dark')) {
      return true;
    }
    const $dark = __querySelectorUp(finalSettings.rootNode, '.-dark');
    if ($dark) {
      return true;
    }
    return false;
  }

  return (
    finalSettings.ctx.matchMedia &&
    finalSettings.ctx.matchMedia('(prefers-color-scheme: dark)').matches
  );
}
