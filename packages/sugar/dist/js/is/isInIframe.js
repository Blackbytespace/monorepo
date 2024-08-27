/**
 * @name      isInIframe
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        stable
 *
 * Check if the page is loaded inside an iframe
 *
 * @return    {Boolean}    true if in iframe, false if not
 *
 * @snippet         __isInIframe($1)
 *
 * @todo      tests
 *
 * @example    js
 * import { __isInIframe } from '@lotsof/sugar/dom'
 * if (__isInIframe()) {
 *   // do something
 * }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __isInIframe() {
    try {
        return window.self !== window.top;
    }
    catch (e) {
        return true;
    }
}
//# sourceMappingURL=isInIframe.js.map