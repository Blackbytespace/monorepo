/**
 * @name            whenBackgroundImageLoaded
 * @namespace       js.dom.detect
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Detect when a background image has been loaded on an HTMLElement
 *
 * @feature       Promise based API
 *
 * @param    {HTMLElement}    $elm    The HTMLElement on which to detect the background image load
 * @return    {SPromise}    A promise that will be resolved when the background image has been loaded
 *
 * @snippet         __whenBackgroundImageLoaded($1)
 * __whenBackgroundImageLoaded($1).then(\$elm => {
 *      $2
 * });
 *
 * @todo      tests
 *
 * @example    js
 * import { __whenBackgroundImageLoaded } from '@lotsof/sugar/dom'
 *
 * // using promise
 * await __whenBackgroundImageLoaded($elm);
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __whenBackgroundImageLoaded($elm: HTMLElement): Promise<HTMLElement>;
