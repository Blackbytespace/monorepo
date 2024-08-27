/**
 * @name                easeOutQuad
 * @namespace           shared.easing
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Ease out quad function
 *
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 *
 * @snippet         __easeOutQuad($1)
 *
 * @example         js
 * import { __easeOutQuad } from '@lotsof/sugar/easing';
 * __easeOutQuad(0.4);
 *
 * @todo      tests
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __easeOutQuad(t: number): number;
