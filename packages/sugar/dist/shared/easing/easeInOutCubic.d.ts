/**
 * @name            easeInOutCubic
 * @namespace       shared.easing
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * Ease in out cubic function
 *
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 *
 * @snippet         __easeInOutCubic($1)
 *
 * @todo     tests
 *
 * @example         js
 * import { __easeInOutCubic } from '@lotsof/sugar/easing';
 * __easeInOutCubic(0.4);
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __easeInOutCubic(t: number): number;
