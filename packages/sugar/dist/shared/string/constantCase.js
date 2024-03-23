import { constantCase } from 'change-case';
/**
 * @name                constantCase
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Constant case a string
 *
 * @param         {String}          text        The string to snakeCase
 * @return        {String}                      The snakeCased string
 *
 * @todo      tests
 *
 * @snippet         __constantCase($1)
 *
 * @example     js
 * import { __constantCase } from '@coffeekraken/sugar/string.js';
 * __constantCase('hello world'); // => HELLO_WORLD
 *
 * @see             https://www.npmjs.com/package/change-case
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __constantCase(text) {
    return constantCase(text);
}
//# sourceMappingURL=constantCase.js.map