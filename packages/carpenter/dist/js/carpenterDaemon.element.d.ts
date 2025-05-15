import __LitElement from '@lotsof/lit-element';
export default class CarpenterDaemonElement extends __LitElement {
    $currentComponent: Element | null;
    constructor();
    get $document(): Document;
    get $window(): Window;
    adoptedCallback(): void;
    private _initComponent;
    private _setComponent;
    private _setDaemonPosition;
    render(): import("lit-html").TemplateResult<1>;
}
