/**
 * @name                    deepMerge
 * @namespace               shared.object
 * @type                    Function
 * @platform                js
 * @platform                node
 * @status                  stable
 *
 * Deep merge one object with another and return the merged object result. This merging implementation support:
 * - Merging object with getters/setters
 * - n numbers of objects as arguments
 * - Choose beetween cloning first (default) the object or keeping the first passed object as result
 * Note that by default the resulting object is a clone and do not have the same reference that the first passed object.
 *
 * @param           {Object}            args...        Pass all the objects you want to merge
 * @param           {TDeepMergeSettings}            [settings={}]       Pass as last object the settings one that can contain these properties:
 * @return          {Object}                              The merged object result
 *
 * @setting         {Boolean}           [array=false]      Merge or not arrays
 * @setting         {Boolean}           [clone=true]            Specify if you want the result object to be a clone or the same first passed object
 *
 * @feature         Support array merging by passing the last parameter as the { array: true } object
 * @feature         Support merging object with getters. Can access the source object from the second object property getter using the `this.$source` property
 *
 * @todo      tests
 *
 * @snippet         __deepMerge($1, $2)
 *
 * @example           js
 * import { __deepMerge } from '@lotsof/sugar/object';
 * __deepMerge({a: {b: {c: 'c', d: 'd'}}}, {a: {b: {e: 'e', f: 'f'}}});
 * // => { a: { b: { c: 'c', d: 'd', e: 'e', f: 'f' } } }
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export type TDeepMergeSettings = {
    array?: boolean;
    clone?: boolean;
};
export default function __deepMerge(...args: any[]): any;
