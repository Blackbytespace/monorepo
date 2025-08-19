import __LitElement from '@lotsof/lit-element';
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
 * @import          import { define as __IconElementDefine } from '@lotsof/icon-element';
 *
 * @snippet         __IconElementDefine($1)
 *
 * @install           shell
 * npm i @lotsof/icon-element
 *
 * @install           js
 * import __SIconElement from '@lotsof/icon-element';
 * __SIconElement.define();
 *
 * @example         html            Simple example
 * <s-icon name="play" />
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class AdvancedSelectElement extends __LitElement {
    name: string;
    type: string;
    provider: string;
    providers: {
        heroicons: {
            name: string;
            url: string;
        };
        fontawesome: {
            name: string;
            url: string;
        };
        pixelarticons: {
            name: string;
            url: string;
        };
    };
    svg: string;
    constructor();
    protected firstUpdated(_changedProperties: PropertyValues): void;
    update(changedProperties: PropertyValues): void;
    private _updateIcon;
    protected mount(): Promise<void>;
    render(): import("lit-html/directive.js").DirectiveResult<typeof import("lit-html/directives/unsafe-html.js").UnsafeHTMLDirective>;
}
