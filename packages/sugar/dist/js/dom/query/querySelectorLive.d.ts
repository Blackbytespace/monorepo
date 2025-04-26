import type { TWhenTrigger } from '../when/when.js';
/**
 * @name            querySelectorLive
 * @namespace       js.dom.query
 * @type            Function
 * @platform        js
 * @status          stable
 * @async
 *
 * Observe the dom to get all the elements that matches a passed css selector at any point in time.
 * Be warned that this use the mutation observer API and will monitor all the document for new nodes. Make sure to use it
 * when you don't have the chance to use the custom elements API instead
 *
 * @feature         Specify what you want to select and get notified each time a node like this appears in the dom
 * @feature         Promise based API
 * @feature         Callback support
 * @feature         Monitor added nodes and existing nodes that have class and id attributes updated
 *
 * @param	      {String} 		                    selector 		      The css selector that we are interested in
 * @param 	    {Function} 		                  cb 				        The function to call with the newly added node
 * @param 	    {TQuerySelectorLiveSettings} 		[settings={}] 	  An optional settings object to specify things like the rootNode to monitor, etc...
 * @return      {SPromise<HTMLElement>}                           An SPromise instance on which to listen for nodes using the "node" event
 *
 * @setting         {HTMLElement}           [rootNode=document]         The root node from where to observe childs
 * @setting         {Boolean}              [once=true]                If true, each observed nodes will be handled only once even if they are removed and reinjected in the dom
 *
 * @snippet         __querySelectorLive($1, $2)
 * __querySelectorLive($1, \$elm => {
 *      $2
 * });
 *
 * @example 	js
 * import { __querySelectorLive } from '@lotsof/sugar/dom'
 * const query = __querySelectorLive('.my-cool-item', (node, api) => {
 * 	    // do something here with the detected node
 *      // call api.cancel if you want to stop listening for this selector
 *      api.cancel();
 * });
 * // cancel the query manually when needed
 * query.cancel();
 *
 * @since           1.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export type TQuerySelectorLiveSettings = {
    rootNode: HTMLElement | Document;
    once: boolean;
    afterFirst?: Function;
    scopes: boolean;
    firstOnly: boolean;
    when?: TWhenTrigger<string>;
    attributes: string[];
};
export type TQuerySelectorLiveApi = {
    cancel: Function;
};
type TQuerySelectorLiveCallback = ($elm: HTMLElement, api: TQuerySelectorLiveApi) => void;
export default function __querySelectorLive(selector: string, cb: TQuerySelectorLiveCallback, settings?: Partial<TQuerySelectorLiveSettings>, _isFirstLevel?: boolean): TQuerySelectorLiveApi;
export {};
