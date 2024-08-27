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
export default function __scrolledClasses(settings) {
    const style = window.getComputedStyle(document.body);
    const finalSettings = Object.assign({ offset: parseInt(style.getPropertyValue('--s-scrolled-classes-offset') || '0') ||
            100, offsetX: parseInt(style.getPropertyValue('--s-scrolled-classes-offset-x') || '0'), offsetY: parseInt(style.getPropertyValue('--s-scrolled-classes-offset-y') || '0'), class: style.getPropertyValue('--s-scrolled-classes-class') || 'scrolled' }, (settings !== null && settings !== void 0 ? settings : {}));
    const offsetX = finalSettings.offsetX !== 0
        ? finalSettings.offsetX
        : finalSettings.offset, offsetY = finalSettings.offsetY !== 0
        ? finalSettings.offsetY
        : finalSettings.offset;
    function handleScroll() {
        let isScrolled = false;
        if (window.scrollY >= offsetY) {
            if (!document.body.classList.contains(`${finalSettings.class}-y`)) {
                document.body.classList.add(`${finalSettings.class}-y`);
            }
            isScrolled = true;
        }
        else {
            if (document.body.classList.contains(`${finalSettings.class}-y`)) {
                document.body.classList.remove(`${finalSettings.class}-y`);
            }
        }
        if (window.scrollX >= offsetX) {
            if (!document.body.classList.contains(`${finalSettings.class}-x`)) {
                document.body.classList.add(`${finalSettings.class}-x`);
            }
            isScrolled = true;
        }
        else {
            if (document.body.classList.contains(`${finalSettings.class}-x`)) {
                document.body.classList.remove(`${finalSettings.class}-x`);
            }
        }
        if (isScrolled) {
            if (!document.body.classList.contains(finalSettings.class)) {
                document.body.classList.add(finalSettings.class);
            }
        }
        else {
            if (document.body.classList.contains(finalSettings.class)) {
                document.body.classList.remove(finalSettings.class);
            }
        }
        requestAnimationFrame(handleScroll);
    }
    requestAnimationFrame(handleScroll);
}
//# sourceMappingURL=scrolledClasses.js.map