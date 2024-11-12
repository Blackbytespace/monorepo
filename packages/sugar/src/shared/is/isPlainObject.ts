/**
 * @name                      isPlainObject
 * @namespace                 shared.is
 * @type                      Function
 * @platform                  js
 * @platform                  node
 * @status                    stable
 *
 * Check if the passed object (or array of objects) is/are plain object(s)
 *
 * @param         {Object|Array}            object                  The object(s) to check
 * @return        {Boolean}                                         true if is plain object(s), false if not
 *
 * @todo      tests
 *
 * @snippet         __isPlainObject($1)
 *
 * @example           js
 * import { __isPlainObject } from '@lotsof/sugar/is';
 * __isPlainObject({ hello: 'world'}); // => true
 *
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __isPlainObject(object: any): boolean {
  if (!object) return false;
  if (typeof object !== 'object') return false;
  if (object.constructor && object.constructor.name !== 'Object') return false;
  if (Object.prototype.toString.call(object) !== '[object Object]')
    return false;
  if (object !== Object(object)) return false;
  // if (object.constructor !== Object) return false;
  return true;
}
