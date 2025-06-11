import '@fontsource/poppins';
import '@lotsof/json-schema-form';
import __LitElement from '@lotsof/lit-element';
import '../../src/css/output/carpenter.build.css';
import { TCarpenterComponent, TCarpenterGroup } from '../shared/carpenter.type.js';
export default class CarpenterEditorElement extends __LitElement {
    lnf: boolean;
    addInternalName: boolean;
    advancedGroup: TCarpenterGroup;
    private _$jsonSchemaForm?;
    constructor();
    get selectedComponent(): TCarpenterComponent | undefined;
    get preselectedComponent(): TCarpenterComponent | null;
    update(changedProperties: any): void;
    mount(): Promise<void>;
    private _initListeners;
    private _renderEditor;
    _renderTree(): any;
    render(): import("lit-html").TemplateResult<1>;
}
