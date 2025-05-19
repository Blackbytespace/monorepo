import __LitElement from '@lotsof/lit-element';
import { TCarpenterComponent } from '../shared/carpenter.type.js';
export default class CarpenterDaemonElement extends __LitElement {
    selectedComponent: TCarpenterComponent | null;
    preselectedComponent: TCarpenterComponent | null;
    $currentComponent: HTMLElement | null;
    constructor();
    get $document(): Document;
    get $window(): Window;
    get component(): TCarpenterComponent | null;
    getComponentJson($component: HTMLElement): TCarpenterComponent | null;
    adoptedCallback(): void;
    private _initComponent;
    private _preselect;
    private _select;
    private _edit;
    private _deleteComponent;
    private _setComponent;
    private _setDaemonPosition;
    render(): import("lit-html").TemplateResult<1>;
}
