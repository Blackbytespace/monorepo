import __set from './set.js';

/**
 * @name                        deleteProperty
 * @namespace                   shared.object
 * @type                        Function
 * @platform                    js
 * @platform                    node
 * @status                      stable
 *
 * Delete an object property using a dotPath like "something.else"
 *
 * @param         {Object}          object            The object on which you want to delete the property
 * @param         {String}          dotPath           The dotpath to the property you want to delete
 *
 * @todo      tests
 *
 * @snippet         __deleteProperty($1, $2)
 *
 * @example         js
 * import { __deleteProperty } from '@blackbyte/sugar/object';
 * const myObject = {
 *    hello: 'world',
 *    plop: 'yop'
 * };
 * __deleteProperty(myObject, 'plop');
 *
 * @since     1.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default function __deleteProperty(object: any, dotPath: string): any {
  const parentDotPath = dotPath.split('.').slice(0, -1).join('.');

  if (!dotPath || dotPath === '' || dotPath === '.') return object;
  dotPath = dotPath.replace(/\[(\w+)\]/g, '.$1');
  dotPath = dotPath.replace(/^\./, '');
  const a = dotPath.split('.');
  let o = object;
  while (a.length) {
    const n = a.shift();
    if (!n) continue;
    if (a.length < 1) {
      if (Array.isArray(o)) {
        const valueToDelete = o[n];
        o = o.filter((v) => {
          return v !== valueToDelete;
        });
      } else {
        delete o[n];
      }
      __set(object, parentDotPath, o);
    } else {
      o = o[n];
    }
  }
  return object;
}
