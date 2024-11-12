/**
 * @name            getTranslateProperties
 * @namespace       js.dom.style
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Get a translate properties of an HTMLElement
 *
 * @param 		{HTMLElement} 					$elm  		The element to get the properties from
 * @return 		{Object} 									The translate x,y and z properties
 *
 * @todo      tests
 *
 * @snippet         __getTranslateProperties($1)
 *
 * @example  	js
 * import { __getTranslateProperties } from '@lotsof/sugar/dom'
 * const props = __getTranslateProperties(myCoolHTMLElement);
 * // output format
 * // {
 * // 	x : 100,
 * // 	y : 0,
 * // 	z : 0
 * // }
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export type TGetTranslatePropertiesResult = {
    x: number;
    y: number;
    z: number;
};
export default function __getTranslateProperties($elm: HTMLElement): TGetTranslatePropertiesResult;
