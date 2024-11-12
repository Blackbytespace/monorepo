/**
 * @name            getStyleProperty
 * @namespace       js.dom.style
 * @type            Function
 * @platform        js
 * @status          beta
 *
 * Get a style property on the passed element through the computed style.
 * This function try to store the actual style to not trigger more that 1 redraw
 * each js execution loop.
 *
 * @param 		{HTMLElement} 					elm  		The element to get style from
 * @param 		{String} 						property 	The css property to get
 * @return 		{Mixed} 									The style value
 *
 * @todo      tests
 *
 * @snippet         __getStyleProperty($1, $2)
 *
 * @example  	js
 * import { __getStyleProperty } from '@lotsof/sugar/dom'
 * const opacity = __getStyleProperty(myCoolHTMLElement, 'opacity');
 *
 * @see 		https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __getStyleProperty(elm: HTMLElement, property: string): any;
