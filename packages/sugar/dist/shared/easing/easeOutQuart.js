/**
 * @name            easeOutQuart
 * @namespace       shared.easing
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * Ease out quart function
 *
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 *
 * @snippet         __easeOutQuart($1)
 *
 * @example         js
 * import { __easeOutQuart } from '@coffeekraken/sugar/easing';
 * __easeOutQuart(0.4);
 *
 * @todo      tests
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __easeOutQuart(t) {
    return 1 - --t * t * t * t;
}
//# sourceMappingURL=easeOutQuart.js.map