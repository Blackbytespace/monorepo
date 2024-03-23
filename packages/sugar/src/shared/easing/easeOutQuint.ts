/**
 * @name                easeOutQuint
 * @namespace           shared.easing
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Ease out quint function
 *
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 *
 * @snippet         __easeOutQuint($1)
 *
 * @example         js
 * import { __easeOutQuint } from '@coffeekraken/sugar/easing.js';
 * __easeOutQuint(0.4);
 *
 * @todo      tests
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __easeOutQuint(t: number): number {
  return 1 + --t * t * t * t * t;
}
