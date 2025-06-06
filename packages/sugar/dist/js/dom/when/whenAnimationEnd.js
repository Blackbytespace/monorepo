/**
 * @name            whenAnimationEnd
 * @namespace       js.dom.when
 * @type            Function
 * @platform        js
 * @status          stable
 * @async
 *
 * Detect when animation ends
 *
 * @param    {HTMLElement}    elm    The element to listen on
 * @return   {Promise<HTMLElement>}                  A promise that will be resolved once the animation has ended
 *
 * @snippet         __whenAnimationEnd($1)
 * __whenAnimationEnd($1).then(\$elm => {
 *      $2
 * });
 *
 * @todo      tests
 *
 * @example    js
 * import { __whenAnimationEnd } from '@lotsof/sugar/dom'
 * __whenAnimationEnd(myCoolElm).then(($elm) => {
 *      // do something...
 * });
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __whenAnimationEnd($elm) {
    return new Promise((resolve) => {
        $elm.addEventListener('animationend', (e) => {
            resolve($elm);
        }, {
            once: true,
        });
    });
}
//# sourceMappingURL=whenAnimationEnd.js.map