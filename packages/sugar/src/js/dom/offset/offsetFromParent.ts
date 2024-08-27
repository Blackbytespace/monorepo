import __offsetFromViewport from './offsetFromViewport.js';

/**
 * @name            offsetFromParent
 * @namespace       js.dom.offset
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Get the offset top and left of the passed element from his parent top left point
 *
 * @param 		{HTMLElement} 					elm  		The element to get the offset from
 * @return 		{top: number; left: number;} 									The offset top and left object
 *
 * @snippet         __offsetFromParent($1)
 *
 * @todo      tests
 *
 * @example  	js
 * import { __offsetFromParent } from '@lotsof/sugar/dom'
 * const offsetFromParentElm = __offsetFromParent(myCoolElement);
 * // output : { top : 200, left : 300 }
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __offsetFromParent(elm: HTMLElement): {
  top: number;
  left: number;
} {
  const parentOffset = __offsetFromViewport(elm.parentElement as HTMLElement);
  const offset = __offsetFromViewport(elm);
  return {
    top: offset.top - parentOffset.top,
    left: offset.left - parentOffset.left,
  };
}
