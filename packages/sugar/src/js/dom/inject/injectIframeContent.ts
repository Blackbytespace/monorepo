/**
 * @name                injectIframeContent
 * @namespace           js.dom.inject
 * @type                Function
 * @platform            js
 * @status              stable
 *
 * Inject some content into an iframe
 *
 * @param       {HTMLIFrameElement}        $iframe          The iframe element to inject content into
 * @param    {String}    html           The html to inject
 *
 * @snippet         __injectIframeContent($1, $2)
 *
 * @todo      tests
 *
 * @example    js
 * import { __injectIframeContent } from '@blackbyte/sugar/dom'
 *  __injectIframeContent($myIframe, '<html>...</html>');
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __injectIframeContent(
  $iframe: HTMLIFrameElement,
  html: string,
): void {
  $iframe.contentWindow?.document.open();
  $iframe.contentWindow?.document.write(html);
  $iframe.contentWindow?.document.close();
}
