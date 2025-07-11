/**
 * @name            easeInQuart
 * @namespace       shared.easing
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * Ease in quart function
 *
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 *
 * @snippet         __easeInQuart($1)
 *
 * @example         js
 * import { __easeInQuart } from '@blackbyte/sugar/easing';
 * __easeInQuart(0.4);
 *
 * @todo      tests
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __easeInQuart(t: number): number {
  return t * t * t * t;
}
