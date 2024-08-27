import __isVisible from '../../is/isVisible.js';
/**
 * @name                closestNotVisible
 * @namespace           js.dom.query
 * @type                Function
 * @platform            js
 * @status              stable
 *
 * Go up the dom three to find the first element that is not visible.
 * Not visible mean that has either an opacity to 0, a visibility to hidden or a display to none
 *
 * @param 		{HTMLElement} 					$elm  		The element to start on
 * @return 		{HTMLElement | undefined} 								The element found or undefined
 *
 * @snippet         __closestNotVisible($1)
 *
 * @todo      tests
 *
 * @example  	js
 * import { __closestNotVisible } from '@lotsof/sugar/dom'
 * const closestElm =  __closestNotVisible(myCoolElement);
 * if (closestElm) {
 * 		// we have found en element that is not visible
 * }
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __closestNotVisible($elm) {
    const originalElm = $elm;
    let $parent = $elm.parentNode;
    while ($parent && $parent != originalElm.ownerDocument) {
        // @ts-ignore
        if (!__isVisible($parent)) {
            return $parent;
        }
        $parent = $parent.parentNode;
    }
    return;
}
//# sourceMappingURL=closestNotVisible.js.map