/**
 * @name            whenDomReady
 * @namespace       js.dom.when
 * @type            Function
 * @platform        js
 * @status          stable
 * @async
 *
 * Wait that the dom is ready before resolving the promise
 *
 * @param       {Function}          [callback=null]     A callback to call when ready
 * @return 		{Promise<void>} 					A promise that will be resolved when the dom is ready
 *
 * @snippet         __whenDomReady()
 * __whenDomReady().then(() => {
 *      $1
 * });
 *
 * @todo      tests
 *
 * @example  	js
 * import { __whenDomReady } from '@blackbyte/sugar/dom'
 * __whenDomReady().then(() => {
 *     // do something...
 * });
 *
 * @see             https://www.jstips.co/en/javascript/detect-document-ready-in-pure-js/
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __whenDomReady(): Promise<void> {
  return new Promise((resolve) => {
    if (document.readyState === 'complete') {
      resolve();
    } else {
      document.onreadystatechange = () => {
        if (document.readyState === 'complete') {
          resolve();
        }
      };
    }
  });
}
