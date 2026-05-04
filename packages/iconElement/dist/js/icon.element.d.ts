import __LitElement from '@blackbyte/lit-element';
import { PropertyValues } from 'lit';
import '../../src/css/icon.element.css';
/**
 * @name                IconElement
 * @as                  Icon Element
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/iconElement.types.ts
 * @platform            html
 * @status              beta
 *
 * Simple icon element that allows you to use heroicons out of the box as well as custom icons for your project
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @import          import { define as __IconElementDefine } from '@blackbyte/icon-element';
 *
 * @snippet         __IconElementDefine($1)
 *
 * @install           shell
 * npm i @blackbyte/icon-element
 *
 * @install           js
 * import __SIconElement from '@blackbyte/icon-element';
 * __SIconElement.define();
 *
 * @example         html            Simple example
 * <s-icon name="play" />
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default class IconElement extends __LitElement {
    static providers: Record<string, {
        name: string;
        url: string;
    }>;
    name: string;
    type: string;
    provider: string;
    providers: Record<string, {
        name: string;
        url: string;
    }>;
    svg: string;
    constructor();
    static addProvider(name: string, url: string): void;
    protected firstUpdated(_changedProperties: PropertyValues): void;
    update(changedProperties: PropertyValues): void;
    private _updateIcon;
    protected mount(): Promise<void>;
    render(): import("lit-html/directive.js").DirectiveResult<typeof import("lit-html/directives/unsafe-html.js").UnsafeHTMLDirective>;
}
