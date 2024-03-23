import { camelCase } from 'change-case';
/**
 * @name                camelCase
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Capital case a string
 *
 * @param         {String}          text        The string to snakeCase
 * @return        {String}                      The snakeCased string
 *
 * @todo      tests
 *
 * @snippet         __camelCase($1)
 *
 * @example     js
 * import { __camelCase } from '@coffeekraken/sugar/string.js';
 * __camelCase('hello world'); // => HELLO WORLD
 *
 * @see             https://www.npmjs.com/package/change-case
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __camelCase(text) {
    return camelCase(text);
}
//# sourceMappingURL=camelCase.js.map