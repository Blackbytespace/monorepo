/**
 * @name                toPlainObject
 * @namespace           shared.class
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * This function take a instance as parameter and return a plain object of it
 *
 * @param               {Mixed}               instance                Any class instance to transform into a plain object
 * @return              {Object}                                      A plain object version of the the class instance
 *
 * @todo      tests
 *
 * @snippet         __toPlainObject($1)
 *
 * @example             js
 * import { __toPlainObject } from '@blackbyte/sugar/class';
 * class Coco {
 *    constructor() {
 *      this.hello = 'world';
 *    }
 * }
 * __toPlainObject(new Coco()); // => { hello: 'world' }
 *
 * @since       1.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function __toPlainObject(theClass: any): any {
  const originalClass = theClass || {};
  const keys = Object.getOwnPropertyNames(originalClass);
  return keys.reduce((classAsObj, key) => {
    classAsObj[key] = originalClass[key];
    return classAsObj;
  }, {});
}
