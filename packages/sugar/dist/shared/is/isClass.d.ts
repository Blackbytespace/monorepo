/**
 * @name                    class
 * @namespace               shared.is
 * @type                    Function
 * @platform                js
 * @platform                node
 * @status                  stable
 *
 * Check if the passed variable (or array of variables) is/are plain variable(s)
 *
 * @param         {Mixed|Array}            variable                  The variable(s) to check
 * @return        {Boolean}                                         true if is class(es), false if not
 *
 * @todo      tests
 *
 * @snippet         __isClass($1)
 *
 * @example           js
 * import { __isClass } = from '@lotsof/sugar/is';
 * __isClass({ hello: 'world'}); // => false
 * const myCoolClass = class Coco{};
 * __isClass(myCoolClass); // => true
 *
 * @see       https://www.npmjs.com/package/is-class
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function isClass(cls: any): boolean;
