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
 * import { __injectHtml } from '@blackbyte/sugar/dom'
 *  __injectHtml('<html>...</html>`, $myElement);
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export default function __injectHtml($elm: HTMLElement, html: string): void {
  // replace the content
  $elm.innerHTML = html;

  // make sure the scripts are executed
  Array.from($elm.querySelectorAll('script')).forEach(
    (oldScriptEl: HTMLElement) => {
      const newScriptEl = document.createElement('script');

      Array.from(oldScriptEl.attributes).forEach((attr) => {
        newScriptEl.setAttribute(attr.name, attr.value);
      });

      const scriptText = document.createTextNode(oldScriptEl.innerHTML);
      newScriptEl.appendChild(scriptText);

      oldScriptEl.parentNode?.replaceChild(newScriptEl, oldScriptEl);
    },
  );
}
