import __whenLinkLoaded from '../when/whenLinkLoaded.js';

/**
 * @name                injectStylesheet
 * @namespace           js.dom.inject
 * @type                Function
 * @platform            js
 * @status              stable
 *
 * Append a stylesheet link to the page head
 *
 * @param    {String}    href    THe url to the stylesheet
 * @return    {Promise}    A promise when the stylesheet is loaded with the link element as parameter
 *
 * @snippet         __injectStylesheet($1)
 *
 * @todo      tests
 *
 * @example    js
 * import { __injectStylesheet } from '@lotsof/sugar/dom'
 * __injectStylesheet('/dist/css/style.css')
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __injectStylesheet(
  href: string,
): Promise<HTMLLinkElement> {
  const $link = document.createElement('link');
  $link.type = 'text/css';
  $link.rel = 'stylesheet';
  $link.href = href;
  document.head.appendChild($link);
  return __whenLinkLoaded($link);
}
