/**
 * @name                whenTransitionEnd
 * @namespace           js.dom.when
 * @type                Function
 * @platform            js
 * @status              stable
 * @async
 *
 * Monitor an HTMLElement to be notified when his transition has ended
 *
 * @feature       Promise based API
 *
 * @param 		{HTMLElement} 				elm 		The element to monitor
 * @return 		(Promise<HTMLElement>) 								The promise that will be resolved when the element transition has ended
 *
 * @snippet         __whenTransitionEnd($1)
 * __whenTransitionEnd($1).then(\$elm => {
 *      $2
 * });
 *
 * @todo      tests
 *
 * @example 	js
 * import { __whenTransitionEnd } from '@lotsof/sugar/dom'
 * await __whenTransitionEnd(myCoolHTMLElement);
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __whenTransitionEnd($elm: HTMLElement): Promise<HTMLElement>;
