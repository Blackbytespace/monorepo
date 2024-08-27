/**
 * @name      isVisible
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        stable
 *
 * Check if the passed HTMLElement is visible or not.
 * Visible mean that it has not an opacity of 0, not a visibility of hidden and not a display of none and `return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);`
 *
 * @param 		{HTMLElement} 				$elm  		The element to check
 * @return 		{Boolean}								If the element is visible or not
 *
 * @snippet         __isVisible($1)
 *
 * @todo      tests
 *
 * @example  	js
 * import { __isVisible } from '@lotsof/sugar/dom'
 * if (isVisible(myCoolHTMLElement) {
 * 		// i'm visible
 * }
 *
 * @see             https://stackoverflow.com/questions/19669786/check-if-element-is-visible-in-dom
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function isVisible(elm: HTMLElement): boolean;
