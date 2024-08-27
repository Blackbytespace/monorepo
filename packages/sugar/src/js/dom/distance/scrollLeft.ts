/**
 * @name            scrollLeft
 * @namespace       js.dom.distance
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Get the amount of scroll left
 *
 * @todo      tests
 *
 * @snippet         __scrollLeft()
 *
 * @example    js
 * import { __scrollLeft } from '@lotsof/sugar/dom'
 * __scrollLeft() // 40
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivier.bossel@gmail.com)
 */
export default function __scrollLeft(): number {
  return (
    window.scrollX ||
    window.pageXOffset ||
    // @ts-ignore
    document.scrollLeft ||
    document.body.scrollLeft
  );
}
