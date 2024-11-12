import { cloneClass } from 'clone-class';
/**
 * @name                cloneClass
 * @namespace           shared.class
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * Clone ES6 Classes
 *
 * @param       {Class}          class        The class to clone
 * @return      {Class}                             A new class
 *
 * @todo      tests
 *
 * @snippet         __cloneClass($1)
 *
 * @example         js
 * import { __cloneClass } from '@lotsof/sugar/class';
 * const NewClass = __cloneClass(class MyClass() {});
 *
 * @see             https://www.npmjs.com/package/clone-class
 * @since           1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function (cls) {
    return cloneClass(cls);
}
//# sourceMappingURL=cloneClass.js.map