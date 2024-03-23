import { pathCase } from 'change-case';
/**
 * @name                pathCase
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Path case a string
 *
 * @param         {String}          text        The string to snakeCase
 * @return        {String}                      The snakeCased string
 *
 * @todo      tests
 *
 * @snippet         __pathCase($1)
 *
 * @example     js
 * import { __pathCase } from '@coffeekraken/sugar/string.js';
 * __pathCase('hello world'); // => hello/world
 *
 * @see             https://www.npmjs.com/package/change-case
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __pathCase(text) {
    return pathCase(text);
}
//# sourceMappingURL=pathCase.js.map