/**
 * @name      isInViewport
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        stable
 *
 * Check if the passed HTMLElement is in the viewport or not
 *
 * @param 		{HTMLElement} 				elm  			The element to insert
 * @param 		{Object} 					[offset=50] 	An object of top, right, bottom and left offset used to detect the status or an object with top, right, bottom and left offsets
 * @return 		{Boolean}									If the element is in the viewport or not
 *
 * @snippet         __isInViewport($1)
 *
 * @todo      tests
 *
 * @example  	js
 * import { __isInViewport } from '@lotsof/sugar/dom'
 * if (__isInViewport(myCoolHTMLElement) {
 * 		// i'm in the viewport
 * }
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export type TIsInViewport = {};
export default function __isInViewport(elm: HTMLElement, settings?: Partial<TIsInViewport>): boolean;
