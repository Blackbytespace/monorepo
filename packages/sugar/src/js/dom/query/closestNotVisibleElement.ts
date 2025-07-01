import __isVisible from '../../is/isVisible.js';

/**
 * @name                closestNotVisibleElement
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
 * @snippet         __closestNotVisibleElement($1)
 *
 * @todo      tests
 *
 * @example  	js
 * import { __closestNotVisibleElement } from '@blackbyte/sugar/dom'
 * const closestElm =  __closestNotVisibleElement(myCoolElement);
 * if (closestElm) {
 * 		// we have found en element that is not visible
 * }
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __closestNotVisibleElement(
  $elm: HTMLElement,
): HTMLElement | undefined {
  const originalElm = $elm;
  let $parent = $elm.parentNode;
  while ($parent && $parent != originalElm.ownerDocument) {
    // @ts-ignore
    if (!__isVisible($parent)) {
      return $parent as HTMLElement;
    }
    $parent = $parent.parentNode;
  }
  return;
}
