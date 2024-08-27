/**
 * @name            elementsInViewport
 * @namespace       js.dom.query
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Get all the elements that are in viewport
 *
 * @setting       {HTMLElement}     [rootNode=document.body]      Specify the root node from where you want to query
 *
 * @param 		{Object} 			settings	 		The settings of the query
 * @return 		{HTMLElement} 							The founded element
 *
 * @snippet         __elementInViewport($1)
 *
 * @todo      tests
 *
 * @example 	js
 * import { __elementsInViewport } from '@lotsof/sugar/dom';
 * const $elements = __elementsInViewport();
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export type TElementsInViewportSettings = {
    rootNode: HTMLElement;
    threshold: number;
};
export default function __elementsInViewport(settings?: Partial<TElementsInViewportSettings>): HTMLElement[];
