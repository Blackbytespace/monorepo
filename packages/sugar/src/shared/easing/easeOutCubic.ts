/**
 * @name            easeOutCubic
 * @namespace       shared.easing
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * Ease out cubic function
 *
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 *
 * @snippet         __easeOutCubic($1)
 *
 * @example         js
 * import { __easeOutCubic } from '@blackbyte/sugar/easing';
 * __easeOutCubic(0.4);
 *
 * @todo      tests
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __easeOutCubic(t: number): number {
  return --t * t * t + 1;
}
