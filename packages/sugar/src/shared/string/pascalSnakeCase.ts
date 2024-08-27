import { pascalSnakeCase } from 'change-case';

/**
 * @name                pascalSnakeCase
 * @namespace           shared.string
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Pascal snake case a string
 *
 * @param         {String}          text        The string to snakeCase
 * @return        {String}                      The snakeCased string
 *
 * @todo      tests
 *
 * @snippet         __pascalSnakeCase($1)
 *
 * @example     js
 * import { __pascalSnakeCase } from '@lotsof/sugar/string';
 * __pascalSnakeCase('hello world'); // => Hello_World
 *
 * @see             https://www.npmjs.com/package/change-case
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __pascalSnakeCase(text: string): string {
  return pascalSnakeCase(text);
}
