import __matches from './matches.js';

/**
 * @name          nextElement
 * @namespace     js.dom.query
 * @type          Function
 * @platform      js
 * @status        stable
 *
 * Browse the passed element next siblings to find the first element that matches the passed selector
 *
 * @param 		{HTMLElement} 					$elm  		The element to start on
 * @param 		{String} 						selector 	A css selector to search for
 * @return 		{HTMLElement|undefined} 								The element found or undefined
 *
 * @snippet         __next($1, $2)
 *
 * @todo      tests
 *
 * @example  	js
 * import { __nextElement } from '@lotsof/sugar/dom'
 * const nextElm =  __nextElement(myCoolElement, '.my-cool-class');
 * if (nextElm) {
 * 		// we have found en element that matches the selector
 * }
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __nextElement(
  $elm: HTMLElement,
  selector: string,
): HTMLElement | undefined {
  let $sibling = $elm.nextSibling;
  while ($sibling) {
    if (__matches($sibling as HTMLElement, selector)) {
      return $sibling as HTMLElement;
    }
    $sibling = $sibling.nextSibling;
  }
  return;
}
