/**
 * @name            matches
 * @namespace       js.dom.query
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Polyfill for the Element.matches function
 *
 * @param 		{HTMLElement} 			elm  			The element to check
 * @param 		{String} 				selector 		The selector to check on the element
 * @return 		{Boolean} 								If the element match the selector or not
 *
 * @snippet         __matches($1, $2)
 *
 * @todo      tests
 *
 * @example  	js
 * import { __matches } from '@lotsof/sugar/dom'
 * if (__matches(myCoolHTMLElement, '.my-cool-css-selector')) {
 * 		// the element match the selector
 * }
 *
 * @see 		https://developer.mozilla.org/en/docs/Web/API/Element/matches
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __matches(el, selector) {
    if (el.nodeName == '#comment' || el.nodeName == '#text') {
        return false;
    }
    const p = Element.prototype;
    const f = p.matches ||
        p.webkitMatchesSelector ||
        // @ts-ignore
        p.mozMatchesSelector ||
        // @ts-ignore
        p.msMatchesSelector ||
        function (s) {
            // @ts-ignore
            return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
        };
    return f.call(el, selector);
}
//# sourceMappingURL=matches.js.map