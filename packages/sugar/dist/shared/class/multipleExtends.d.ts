/**
 * @name                multipleExtends
 * @namespace           shared.class
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              alpha
 *
 * This function allows you to extends your class with multiple other ones.
 *
 * @param     {Class}           ...classes          All the classed you want to extend the first one with
 *
 * @todo      tests
 *
 * @snippet         __multipleExtends($1, $2)
 *
 * @example         js
 * import { __multipleExtends } from '@lotsof/sugar/class';
 * class MyCoolClass extends __multipleExtends(Another, AnotherOne) {
 * }
 *
 * @see       https://www.npmjs.com/package/aggregation
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
declare const _default: (...classes: any[]) => any;
export default _default;
