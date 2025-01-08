/**
 * @name            scrollSpy
 * @namespace       js.scroll
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * This function allows you to add/remove automatically the `-active` class on
 * some passed links that have a `href` attribute that points to an element on the page.
 *
 * @param           {TScrollSpySettings}          [settings={}]           The settings you want to override
 *
 * @setting        {number}        [offset=window.innerHeight/2]        The offset you want before adding the classes
 * @setting        {string}        [activeClass=-active]        The class name you want to add/remove
 *
 * @snippet          __scrollSpy($1);
 *
 * @example         js
 * import { __scrollSpy } from '@lotsof/sugar/scroll';
 * __scrollSpy($myLinks);
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export type TScrollSpySettings = {
    offset?: number;
    activeClass?: string;
};
export default function scrollSpy($links: NodeListOf<HTMLAnchorElement>, settings?: TScrollSpySettings): void;
