import __LitElement from '@lotsof/lit-element';
import { PropertyValues } from 'lit';
import '../../src/css/output/carpenter.build.css';
import { TCarpenterComponent } from '../shared/carpenter.type.js';
export default class CarpenterDaemonElement extends __LitElement {
    scrollOnSelect: boolean;
    scrollOnPreselect: boolean;
    constructor();
    get $document(): Document;
    get $window(): Window;
    get component(): TCarpenterComponent | undefined;
    protected firstUpdated(_changedProperties: PropertyValues): void;
    protected updateUiMode(): void;
    adoptedCallback(): void;
    private _initComponent;
    private _preventScroll;
    private _preselect;
    private _onPreselect;
    private _select;
    private _onSelect;
    private _edit;
    private _deleteComponent;
    private _updateDaemonPosition;
    render(): import("lit-html").TemplateResult<1>;
}
