/**
 * @name                uncamelize
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Uncamelize a string
 *
 * @param    {String}    string    The string to uncamelize
 * @param    {String}    [separator='-']    The separator to use
 * @return    {String}    The uncamelized string
 *
 * @todo      tests
 *
 * @snippet         __uncamelize($1)
 *
 * @example    js
 * import { __uncamelize } from '@lotsof/sugar/string'
 * __uncamelize('helloWorldAndUniverse') // hello-world-and-universe
 *
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __uncamelize(text: string, separator?: string): string;
