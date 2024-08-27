// @ts-nocheck

/**
 * @name                isFunction
 * @namespace           shared.is
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Check if the passed value is a js function
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a function, false if not
 *
 * @todo      tests
 *
 * @snippet         __isFunction($1)
 *
 * @example    js
 * import { __isFunction } from '@lotsof/sugar/is'
 * if (__isFunction(function() {})) {
 *   // do something
 * }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __isFunction(value: any): boolean {
  return value && {}.toString.call(value) === '[object Function]';
}
