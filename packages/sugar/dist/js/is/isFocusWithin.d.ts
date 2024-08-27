/**
 * @name            isFocusWithin
 * @namespace       js.is
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Check if the mouse is isFocusWithin the passed HTMLElement
 *
 * @param    {HTMLElement}    $elm    The HTMLElement to check
 *
 * @snippet         __isFocusWithin($1)
 *
 * @todo      tests
 *
 * @example    js
 * import { __isFocusWithin } from '@lotsof/sugar/dom'
 * const $myElm = document.querySelector('.my-elm')
 * if (__isFocusWithin($myElm)) {
 *   // do something
 * }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __isFocusWithin($elm: HTMLElement): boolean;
