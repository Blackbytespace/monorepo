/**
 * @name                deepMap
 * @namespace           shared.object
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * This function is the same as the "map" one. The only difference is that this one goes deep into the object
 *
 * @param         {Object}        object          The object you want to map through
 * @param         {Function}      processor       The processor function that take as parameter the actual property value, the current property name and the full dotted path to the current property
 * @param         {Object}        [settings={}]     An object of settings to configure your deepMap process:
 *
 * @setting    {Boolean}              [classInstances=false]            Specify if you want the objects to be processed the same as other values
 * @setting         {Boolean}       [array=true]                    Specify if we want to process also arrays or not
 * @setting         {Boolean}       [clone=false]          Specify if you want to clone the object passed before cleaning it
 * @setting         {Boolean}      [privateProps=true]     Specify if you want to clean also the private properties that starts with "_"
 *
 * @todo      tests
 *
 * @snippet         __deepMap($1, $2)
 * __deepMap($1, ({object, prop, value, path}) => {
 *      $2
 * })
 *
 * @example       js
 * import { __deepMap } from '@lotsof/sugar/object';
 * __deepMap({
 *    hello: 'world'
 * }, ({object, prop, value, path}) => {
 *    return '~ ' + value;
 * });
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export type TDeepMapSettings = {
    classInstances?: boolean;
    array?: boolean;
    clone?: boolean;
    privateProps?: boolean;
};
export default function __deepMap(objectOrArray: any, processor?: Function, settings?: TDeepMapSettings, _path?: never[]): any;
