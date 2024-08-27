/**
 * @name            querySelectorAll
 * @namespace       js.dom.query
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Enhanced proxy of the Element.querySelectorAll function that let you specify
 * if you want elements that are visible, or even that are in the viewport
 *
 * @feature       Specify if you want nodes that are only inside or outside the viewport
 * @feature       Specify if you want nodes that are only visible or invisible
 *
 * @setting       {Boolean}       [visible=null]        Specify if you want only the visible nodes
 * @setting       {Boolean}       [inViewport=null]     Specify if you want only the nodes that are in the viewport
 * @setting       {HTMLElement}     [rootNode=document.body]      Specify the root node from where you want to query
 *
 * @param 		{String} 				selector 			The css selector to search
 * @param 		{Object} 				settings	 		The settings of the query
 * @return 		{Array}<HTMLElement> 						The founded elements
 *
 * @todo      tests
 *
 * @snippet         __querySelectorAll($1)
 *
 * @example 	js
 * import { __querySelectorAll } from '@lotsof/sugar/dom';
 * // simple query
 * const elms = __querySelectorAll('.a-cool-css-selector');
 *
 * // get elements that are in the viewport
 * const elms = __querySelectorAll('.a-cool-css-selector', {
 * 		inViewport : true
 * });
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export type TQuerySelectorAllSettings = {
    visible: boolean | null;
    inViewport: boolean | null;
    rootNode: HTMLElement;
};
export default function __querySelectorAll(selector: string, settings?: Partial<TQuerySelectorAllSettings>): HTMLElement[];
