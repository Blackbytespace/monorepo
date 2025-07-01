/**
 * @name            easeOutQuart
 * @namespace       shared.easing
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * Ease out quart function
 *
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 *
 * @snippet         __easeOutQuart($1)
 *
 * @example         js
 * import { __easeOutQuart } from '@blackbyte/sugar/easing';
 * __easeOutQuart(0.4);
 *
 * @todo      tests
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __easeOutQuart(t: number): number {
  return 1 - --t * t * t * t;
}
