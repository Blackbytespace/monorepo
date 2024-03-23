import { sprintf as _sprintf } from 'sprintf-js';
/**
 * @name                sprintf
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Javascript implementation of the sprintf php function.
 * >For more infos, check [this github repository](https://github.com/alexei/sprintf.js)
 *
 * @param    {String}    format    The format of the string wanted as output
 * @param    {Mixed}    ...replacements    The replacement tokens to apply to the string
 * @return    {String}    The processed string
 *
 * @todo      tests
 *
 * @snippet         __sprintf($1)
 *
 * @example    js
 * import { __sprintf } from '@coffeekraken/sugar/string'
 * __sprintf('Hello %s', 'world') // Hello World
 * const user = { name: 'Dolly' }
 * __sprintf('Hello %(name)s', user) // Hello Dolly
 *
 * @see    https://github.com/alexei/sprintf.js
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __sprintf() {
    // @ts-ignore
    return _sprintf.apply(this, arguments);
}
//# sourceMappingURL=sprintf.js.map