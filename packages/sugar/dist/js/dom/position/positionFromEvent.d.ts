/**
 * @name            positionFromEvent
 * @namespace       js.dom.position
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Get the position from an event "touchstart", "touchmove", "touchend", "mousedown", "mousemove" or "mouseup".
 *
 * @param 		{MouseEvent|TouchEvent} 					e  		The event to get the position from
 * @return 		{x: number; y: number;} 									The absolute position of the event
 *
 * @snippet         __positionFromEvent($1)
 *
 * @todo      tests
 *
 * @example  	js
 * import { __positionFromEvent } from '@lotsof/sugar/dom'
 * __positionFromEvent(e);
 * // output : { x, 230, y: 122 }
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __positionFromEvent(e: MouseEvent | TouchEvent): {
    x: number;
    y: number;
};
