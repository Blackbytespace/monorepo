/**
 * @name            easeInOutQuad
 * @namespace       shared.easing
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * Ease in out quad function
 *
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 *
 * @snippet         __easeInOutQuad($1)
 *
 * @example         js
 * import { __easeInOutQuad } from '@lotsof/sugar/easing';
 * __easeInOutQuad(0.4);
 *
 * @todo      tests
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __easeInOutQuad(t: number): number;
