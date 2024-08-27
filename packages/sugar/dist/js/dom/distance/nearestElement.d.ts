/**
 * @name            nearestElement
 * @namespace       js.dom.distance
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Get the nearest element from the passed one from the passed elements list.
 * You can pass a direction like "top", "right", "bottom", "left" to specify
 * the direction you want to search the nearest element.
 *
 * @param           {HTMLElement}           $from            The element from which to start the search
 * @param           {HTMLElement[]}          $elements       The elements list to search in
 * @param           {INearestElementSettings}         [settings={}]       Some settings to configure your search
 * @return        {HTMLElement}                           The nearest element found
 *
 * @todo      tests
 *
 * @snippet         __nearestElement($1, $2, $3)
 *
 * @example    js
 * import { __nearestElement } from '@lotsof/sugar/dom'
 * __nearestElement(myCoolElement, document.querySelectorAll('.my-cool-elements'), {
 *      direction: 'top'
 * });
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivier.bossel@gmail.com)
 */
export interface INearestElementSettings {
    direction?: 'top' | 'right' | 'bottom' | 'left';
}
export default function __nearestElement($from: HTMLElement, $elements: HTMLElement[], settings?: INearestElementSettings): HTMLElement | undefined;
