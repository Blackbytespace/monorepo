import '@fontsource/poppins';
import '@lotsof/json-schema-form';
import __LitElement from '@lotsof/lit-element';
import { PropertyValues } from 'lit';
import '../../src/css/output/carpenter.build.css';
import { type TCarpenterAdapter, type TCarpenterComponent, type TCarpenterGroup } from '../shared/carpenter.type.js';
export default class CarpenterElement extends __LitElement {
    adapter?: TCarpenterAdapter | string;
    selectedComponent?: TCarpenterComponent;
    preselectedComponent?: TCarpenterComponent | null;
    uiMode: string;
    appendToBody: boolean;
    addInternalName: boolean;
    centerContent: boolean;
    advancedGroup: TCarpenterGroup;
    private _$iframe?;
    private _$daemon?;
    constructor();
    private static _adapters;
    static registerAdapter(id: string, adapter: TCarpenterAdapter): void;
    update(changedProperties: any): void;
    protected firstUpdated(_changedProperties: PropertyValues): void;
    mount(): Promise<void>;
    private _initDaemonListeners;
    private _initListeners;
    private _setSelectedComponent;
    private _setPreselectedComponent;
    render(): import("lit-html").TemplateResult<1>;
}
