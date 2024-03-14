// @ts-nocheck

import __clipboardy from "clipboardy";
import __ncp from "copy-paste";

/**
 * @name            copyText
 * @namespace            node.clipboard
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * Simple function to copy things into the system clipboard.
 * This is using https://www.npmjs.com/package/clipboardy under the hood.
 *
 * @param       {String}      text        The text to copy
 * @return      {String}                The text that has been copied
 *
 * @todo      tests
 *
 * @snippet         __copyText($1)
 *
 * @example       js
 * import { __copyText } from '@lotsof/sugar/clipboard';
 * __copyText('Hello world');
 *
 * @since       2.0.0
 * @see         https://www.npmjs.com/package/clipboardy
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __copyText(text: string): string {
    try {
        __clipboardy.writeSync(text);
    } catch (e) {
        __ncp.copy(text);
    }
    return text;
}
