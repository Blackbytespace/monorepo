/**
 * @name                    set
 * @namespace               shared.object
 * @type                    Function
 * @platform                js
 * @platform                node
 * @status                  stable
 *
 * Set an object value using a dotted object path like "myObject.myProperty.myValue" to set his position
 * If the path parameter is set to '.', it will act like an `Object.assign(obj, value)`.
 *
 * @param                         {Object}                         obj                      The object in which to set the value
 * @param                         {String|String[]}                        path                      The object path where to set the value
 * @param                         {Mixed}                         value                     The value to set
 * @return                        {Mixed}                                                   Return the setted value if setted correctly, or undefined if something goes wrong...
 *
 * @setting             {Boolean}           [preferAssign=false]            Specify if you prefer using Object.assign rather than = for objects to keep references
 *
 * @todo      tests
 *
 * @snippet         __set($1, $2)
 *
 * @example               js
 * import { __set } from '@lotsof/sugar/object';
 *  __set('myObject.cool.value', 'Hello world'); // => Hello world
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export type TSetSettings = {
    preferAssign: boolean;
};
export default function __set(obj: any, path: string | string[], value: any, settings?: TSetSettings): void;
