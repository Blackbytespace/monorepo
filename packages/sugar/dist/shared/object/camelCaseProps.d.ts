/**
 * @name                camelCaseProps
 * @namespace           shared.object
 * @type                Function
 * @platform            js
 * @platform            node
 * @status              stable
 *
 * This function simply take an object as argument and return the same one but with properties in camel case.
 *
 * @param           {Object}            object          An object on which to apply the camel case treatment
 * @param           {IApplyScopeSettings}           [settings={}]           Some settings to configure your scope application process
 *
 * @setting         {Boolean}           [deep=true]             Specify if you want to apply the treatment deep in the object or just in the first level
 *
 * @todo        tests
 *
 * @snippet         __camelCaseProps($1)
 *
 * @example         js
 * import { __camelCaseProps } from '@lotsof/sugar/object';
 * __camelCaseProps({
 *    'hello-world': true
 * });
 * // {
 * //   helloWorld: true
 * // }
 *
 * @since           1.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export type TCamelCasePropsSettings = {
    deep: boolean;
};
export default function __camelCaseProps(object: any, settings?: Partial<TCamelCasePropsSettings>): any;
