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
 * import { __easeInQuart } from '@coffeekraken/sugar/easing';
 * __easeInQuart(0.4);
 *
 * @todo      tests
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __easeInQuart(t: number): number {
  return t * t * t * t;
}
