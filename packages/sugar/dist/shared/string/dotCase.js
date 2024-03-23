import { dotCase } from 'change-case';
/**
 * @name                dotCase
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
 * @snippet         __dotCase($1)
 *
 * @example     js
 * import { __dotCase } from '@coffeekraken/sugar/string.js';
 * __dotCase('hello world'); // => hello.world
 *
 * @see             https://www.npmjs.com/package/change-case
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __dotCase(text) {
    return dotCase(text);
}
//# sourceMappingURL=dotCase.js.map