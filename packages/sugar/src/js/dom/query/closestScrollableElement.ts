import __isScrollable from '../../is/isScrollable.js';
import __querySelectorUp from './querySelectorUp.js';

/**
 * @name                closestScrollableElement
 * @namespace           js.dom.query
 * @type                Function
 * @platform            js
 * @status              stable
 *
 * Go up the dom three to find the first element that is scrollable.
 * The default scrollable element is the body
 *
 * @param 		{HTMLElement} 					$elm  		The element to start on
 * @return 		{HTMLElement|undefined} 								The element found or undefined
 *
 * @snippet         __closestScrollableElement($1)
 *
 * @todo      tests
 *
 * @example  	js
 * import { __closestScrollableElement } from '@lotsof/sugar/dom';
 * __closestScrollableElement($myElement);
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __closestScrollableElement(
  $elm: HTMLElement,
): HTMLElement | undefined {
  const res = __querySelectorUp($elm, ($e) => __isScrollable($e));
  return res;
}
