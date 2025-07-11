import __memoizee from 'memoizee';

/**
 * @name            memoize
 * @namespace       shared.function
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          stable
 *
 * This function can be used to memorize a function call result in order to save memory.
 * This is just a "proxy" of the "memoizee" package.
 *
 * @snippet         __momoize($1)
 *
 * @param       {Function}          fn      The function to memoize his result
 * @return      {Any}                       The memoized function result
 *
 * @example         js
 * import { __memoize } from '@blackbyte/sugar/function';
 * const fn =  __memoize(function(text) => {
 *    return `Hello ${text}`;
 * });
 * const result = fn('world'); // first execution. no cache
 * const result1 = fn('plop'); // first execution with this argument, no cache
 * const result2 = fn('world'); // taken from cache
 *
 * @see             https://www.npmjs.com/package/memoizee
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __memoize(...args): any {
  return __memoizee(...args);
}
