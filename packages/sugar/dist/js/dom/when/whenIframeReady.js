/**
 * @name            whenIframeReady
 * @namespace       js.dom.detect
 * @type            Function
 * @platform        js
 * @status          stable
 * @async
 *
 * Wait until the passed iframe is ready to be used
 *
 * @param       {HTMLIframeElement}         $iframe          The iframe to wait on
 * @return 		{Promise<HTMLIframeElement>} 					A promise that will be resolved when an interaction has been made
 *
 * @snippet         __whenIframeReady($1)
 * __whenIframeReady($1).then(\$elm => {
 *      $2
 * });
 *
 * @todo      tests
 *
 * @example  	js
 * import { __whenIframeReady } from '@lotsof/sugar/dom'
 * __whenIframeReady($myCoolIframe).then($iframe => {
 *      // do something...
 * });
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __whenIframeReady($iframe) {
    return new Promise((resolve) => {
        var _a, _b;
        if ((_b = (_a = $iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.document) === null || _b === void 0 ? void 0 : _b.body) {
            return resolve($iframe);
        }
        let int = setInterval(() => {
            var _a, _b;
            if ((_b = (_a = $iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.document) === null || _b === void 0 ? void 0 : _b.body) {
                clearInterval(int);
                resolve(null);
            }
        }, 10);
    });
}
//# sourceMappingURL=whenIframeReady.js.map