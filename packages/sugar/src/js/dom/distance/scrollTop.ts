/**
 * @name            scrollTop
 * @namespace       js.dom.distance
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Return the amount of scroll top that the user as made in the page
 *
 * @return      {Number}            The amount of scroll top that the user as made in the page
 *
 * @snippet         __scrollTop()
 *
 * @todo      tests
 *
 * @example     js
 * import { __scrollTop } from '@blackbyte/sugar/dom';
 * __scrollTop();
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space) (https://olivierbossel.com)
 */
function scrollTop(): number {
  return (
    window.scrollY ||
    window.pageYOffset ||
    // @ts-ignore
    document.scrollTop ||
    document.body.scrollTop
  );
}
export default scrollTop;
