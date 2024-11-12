import __isInViewport from '../../is/isInViewport.js';
import __isVisible from '../../is/isVisible.js';
import __closestNotVisibleElement from './closestNotVisibleElement.js';

/**
 * @name            querySelector
 * @namespace       js.dom.query
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * Enhanced proxy of the Element.querySelector function that let you specify
 * if you want an element that is visible, or even that is in the viewport
 *
 * @feature       Specify if you want nodes that are only inside or outside the viewport
 * @feature       Specify if you want nodes that are only visible or invisible
 *
 * @setting       {Boolean}       [visible=null]        Specify if you want only the visible nodes
 * @setting       {Boolean}       [inViewport=null]     Specify if you want only the nodes that are in the viewport
 * @setting       {HTMLElement}     [rootNode=document.body]      Specify the root node from where you want to query
 *
 * @param 		{String} 			selector 			The css selector to search
 * @param 		{Object} 			settings	 		The settings of the query
 * @return 		{HTMLElement} 							The founded element
 *
 * @snippet         __querySelector($1)
 *
 * @todo      tests
 *
 * @example 	js
 * import { __querySelector } from '@lotsof/sugar/dom';
 * // simple query
 * const elm = __querySelector('.a-cool-css-selector');
 *
 * // get an element that is in the viewport
 * const elm = __querySelector('.a-cool-css-selector', {
 * 		inViewport : true
 * });
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */

export type TQuerySelectorSettings = {
  visible: boolean | null;
  inViewport: boolean | null;
  rootNode: HTMLElement;
};

export default function __querySelector(
  selector: string,
  settings: Partial<TQuerySelectorSettings> = {},
): HTMLElement | undefined {
  // extend settings
  const finalSettings: TQuerySelectorSettings = {
    visible: null,
    inViewport: null,
    rootNode: document.body,
    ...settings,
  };

  // grab the element into the dom
  const $elm = finalSettings.rootNode.querySelector(selector) as HTMLElement;
  // if no element, stop here
  if (!$elm) return;

  // check finalSettings
  if (finalSettings.visible === false) {
    if (__isVisible($elm) || __closestNotVisibleElement($elm)) return;
  } else if (finalSettings.visible === true) {
    if (!__isVisible($elm) || !__closestNotVisibleElement($elm)) return;
  }
  if (finalSettings.inViewport === false) {
    if (__isInViewport($elm)) return;
  } else if (finalSettings.inViewport === true) {
    if (!__isInViewport($elm)) return;
  }

  // return the element
  return $elm;
}
