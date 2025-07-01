import __LitElement from '@lotsof/lit-element';
import '../../../../src/components/groupRenderers/stackGroupRenderer/stackGroupRenderer.bare.css';
export default class CarpenterStackGroupRenderer extends __LitElement {
    buttonText: string;
    isOpen: boolean;
    renderedProps: any;
    private _escapeQueues;
    constructor();
    private _clickOutsideHandler;
    updateSizeProperties(): void;
    open(): void;
    close(): void;
    protected render(): any;
}
