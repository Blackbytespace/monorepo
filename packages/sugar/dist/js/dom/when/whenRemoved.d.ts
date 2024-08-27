/**
 * @name            whenRemoved
 * @namespace       js.dom.detect
 * @type            Function
 * @platform        js
 * @status          stable
 * @async
 *
 * Resolve a promise when the passed node has been removed from the dom
 *
 * @feature       Detect when the element has been removed from the dom
 * @feature       Possibility to pass a check function to check if the attribute suits your needs
 * @feature       Promise based API
 *
 * @param 		{HTMLElement} 				$elm 				The HTMLElement on which to monitor
 * @return 		(Promise<HTMLElement>) 										The promise that will be resolved when the attribute exist on the element (and that it passes the checkFn)
 *
 * @snippet         __whenRemoved($1);
 * __whenRemoved($1).then(() => {
 *      $2
 * });
 *
 * @todo      tests
 *
 * @example 	js
 * import { __whenRemoved } from '@lotsof/sugar/dom'
 * __whenRemoved(myCoolHTMLElement).then(() => {
 * 		// the element has been removed
 * });
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __whenRemoved($elm: HTMLElement): Promise<HTMLElement>;
