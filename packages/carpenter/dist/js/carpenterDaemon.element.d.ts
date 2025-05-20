import __LitElement from '@lotsof/lit-element';
import { PropertyValues } from 'lit';
import { TCarpenterComponent } from '../shared/carpenter.type.js';
export default class CarpenterDaemonElement extends __LitElement {
    uiMode: string;
    selectedComponent: TCarpenterComponent | null;
    preselectedComponent: TCarpenterComponent | null;
    $selectedComponent: HTMLElement | null;
    $preselectedComponent: HTMLElement | null;
    constructor();
    get $document(): Document;
    get $window(): Window;
    get component(): TCarpenterComponent | null;
    get $component(): HTMLElement | null;
    protected update(changedProperties: PropertyValues): void;
    protected firstUpdated(_changedProperties: PropertyValues): void;
    getComponentJson($component: HTMLElement): TCarpenterComponent | null;
    adoptedCallback(): void;
    private _initComponent;
    private _preselect;
    private _select;
    private _edit;
    private _deleteComponent;
    private _updateDaemonPosition;
    render(): import("lit-html").TemplateResult<1>;
}
