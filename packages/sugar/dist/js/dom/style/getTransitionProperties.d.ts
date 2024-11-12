/**
 * @name            getTransitionProperties
 * @namespace       js.dom.style
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Get the css transition properties from an HTMLElement in an object format
 *
 * @param 		{HTMLElement} 					elm  		The element to get the properties from
 * @return 		{Object} 									The animation properties
 *
 * @todo      tests
 *
 * @snippet         __getTransitionProperties($1)
 *
 * @example  	js
 * import { getTransitionProperties } from '@lotsof/sugar/dom'
 * const props = __getTransitionProperties(myCoolHTMLElement);
 * // output format
 * // {
 * // 	property : ['all'],
 * // 	duration : [200],
 * // 	delay : [0],
 * // 	timingFunction : ['linear'],
 * // 	totalDuration : 200
 * // }
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export type TGetTransitionPropertiesResult = {
    transitions: TGetTransitionPropertiesObject[];
    totalDuration: number;
};
export type TGetTransitionPropertiesObject = {
    property: string;
    duration: number;
    delay: number;
    timingFunction: string;
};
declare function getTransitionProperties(elm: HTMLElement): TGetTransitionPropertiesResult;
export default getTransitionProperties;
