/**
 * @name            scrolledClasses
 * @namespace       js.dom.feature
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * This feature allows you to have `scrolled`, `scrolled-x` and `scrolled-y` classes added and removed from
 * the body depending on an scroll offset that can be set by:
 * 1. Passing some offsets through the settings
 * 2. Setting the `--s-scrolled-classes-{setting}` css variable in your style
 *
 * @param           {TScrolledClassesSettings}          [settings={}]           The settings you want to override
 *
 * @setting         {number}        [offset=100]        The offset you want before adding the classes
 * @setting         {number}        [offsetX=null]             The offset x you want before adding the classes
 * @setting         {number}        [offsetY=null]             The offset y you want before adding the classes
 * @setting         {string}        [class=scrolled]        The class name you want. Will be used also in the %cls-x and %cls-y classes
 *
 * @snippet          __scrolledClasses($1);
 *
 * @example         js
 * import { __scrolledClasses } from '@lotsof/sugar/features';
 * __scrolledClasses({
 *      class: 'hello',
 *      offset: 200
 * });
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export type TScrolledClassesSettings = {
    offset: number;
    offsetX: number;
    offsetY: number;
    class: string;
};
export default function __scrolledClasses(settings?: TScrolledClassesSettings): void;
