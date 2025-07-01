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
 * import { __easeOutQuint } from '@blackbyte/sugar/easing';
 * __easeOutQuint(0.4);
 *
 * @todo      tests
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __easeOutQuint(t: number): number {
  return 1 + --t * t * t * t * t;
}
