/**
 * @name                injectHtml
 * @namespace           js.dom.inject
 * @type                Function
 * @platform            js
 * @status              stable
 *
 * Inject some html into a element and make sure that the scripts are executed
 *
 * @param       {HTMLElement}        $elm           The element to inject content into
 * @param       {String}            html           The html to inject
 *
 * @snippet         __injectHtml($1, $2)
 *
 * @todo      tests
 *
 * @example    js
 * import { __injectHtml } from '@lotsof/sugar/dom'
 *  __injectHtml('<html>...</html>`, $myElement);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __injectHtml($elm, html) {
    // replace the content
    $elm.innerHTML = html;
    // make sure the scripts are executed
    Array.from($elm.querySelectorAll('script')).forEach((oldScriptEl) => {
        var _a;
        const newScriptEl = document.createElement('script');
        Array.from(oldScriptEl.attributes).forEach((attr) => {
            newScriptEl.setAttribute(attr.name, attr.value);
        });
        const scriptText = document.createTextNode(oldScriptEl.innerHTML);
        newScriptEl.appendChild(scriptText);
        (_a = oldScriptEl.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(newScriptEl, oldScriptEl);
    });
}
//# sourceMappingURL=injectHtml.js.map