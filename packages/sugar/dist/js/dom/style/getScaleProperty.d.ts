/**
 * @name            getScaleProperty
 * @namespace       js.dom.style
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Get a scale properties of an HTMLElement
 *
 * @param 		{HTMLElement} 					$elm  		The element to get the properties from
 * @return 		{Number}                                     The scale property
 *
 * @todo      tests
 *
 * @snippet         __getScaleProperty($1)
 *
 * @example  	js
 * import { __getScaleProperty } from '@lotsof/sugar/dom'
 * const props = __getScaleProperty(myCoolHTMLElement);
 * // output format
 * // 2
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export type TGetScalePropertyResult = {
    x: number;
    y: number;
    z: number;
};
export default function __getScaleProperty($elm: HTMLElement): TGetScalePropertyResult | undefined;
