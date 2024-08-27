import __matches from './matches.js';

/**
 * @name          previousElement
 * @namespace     js.dom.query
 * @type          Function
 * @platform      js
 * @status        stable
 *
 * Browse the passed element previous siblings to find the first element that matches the passed selector
 *
 * @param 		{HTMLElement} 					$elm  		The element to start on
 * @param 		{String} 						selector 	A css selector to search for
 * @return 		{HTMLElement|undefined} 								The element found or undefined
 *
 * @snippet         __previousElement($1, $2)
 *
 * @todo      tests
 *
 * @example  	js
 * import { __previousElement } from '@lotsof/sugar/dom'
 * const previousElm = __previousElement(myCoolElement, '.my-cool-class');
 * if (previousElm) {
 * 		// we have found en element that matches the selector
 * }
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __previousElement(
  $elm: HTMLElement,
  selector: string,
): HTMLElement | undefined {
  let $sibling = $elm.previousSibling;
  while ($sibling) {
    if (__matches($sibling as HTMLElement, selector)) {
      return $sibling as HTMLElement;
    }
    $sibling = $sibling.previousSibling;
  }
  return;
}
