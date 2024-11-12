import __escape from 'escape-html';
/**
 * @name            escapeHtml
 * @namespace       shared.html
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * This function allows you to escape some html characters like &lt;, etc...
 *
 * @param       {String}            html            The html to unescape
 * @return      {String}                            The unescaped html
 *
 * @snippet         __escapeHtml($1)
 *
 * @todo      tests
 *
 * @example         js
 * import { __escapeHtml } from '@lotsof/sugar/html';
 * __escapeHtml('<s-code-example>'); // => &lt;s-code-example&gt;
 *
 * @see             https://www.npmjs.com/package/escape-html
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __escapeHtml(html) {
    // @ts-ignore
    return __escape(html);
}
//# sourceMappingURL=escapeHtml.js.map