import __matches from './matches.js';
/**
 * @name          previous
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
 * @snippet         __previous($1, $2)
 *
 * @todo      tests
 *
 * @example  	js
 * import { __previous } from '@lotsof/sugar/dom'
 * const previousElm = __previous(myCoolElement, '.my-cool-class');
 * if (previousElm) {
 * 		// we have found en element that matches the selector
 * }
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __previous($elm, selector) {
    let $sibling = $elm.previousSibling;
    while ($sibling) {
        if (__matches($sibling, selector)) {
            return $sibling;
        }
        $sibling = $sibling.previousSibling;
    }
    return;
}
//# sourceMappingURL=previous.js.map