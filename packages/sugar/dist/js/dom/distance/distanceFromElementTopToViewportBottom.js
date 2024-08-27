import __scrollTop from '../distance/scrollTop.js';
import __offsetFromViewport from '../offset/offsetFromViewport.js';
/**
 * @name            distanceFromElementTopToViewportBottom
 * @namespace       js.dom.distance
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * This function take an element as parameter and returns you to distance it has
 * from the element top to the viewport bottom in pixels
 *
 * @param       {HTMLElement}       elm             The element you want to get the distance from
 * @return      {Number}                            The calculated distance
 *
 * @snippet         __distanceFromElementTopToViewportBottom($1)
 *
 * @example         js
 * import { __distanceFromElementTopToViewportBottom } from '@lotsof/sugar/dom';
 * __distanceFromElementTopToViewportBottom(myElement); // => 23
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __distanceFromElementTopToViewportBottom(elm) {
    const offsets = __offsetFromViewport(elm);
    const scrollTop = __scrollTop();
    // @ts-ignore
    const viewportHeight = window.innerHeight;
    const distance = viewportHeight - offsets.top + scrollTop;
    return distance;
}
//# sourceMappingURL=distanceFromElementTopToViewportBottom.js.map