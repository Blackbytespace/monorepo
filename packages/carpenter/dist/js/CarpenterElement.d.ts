import __LitElement from '@lotsof/litElement';
import __CarpenterFetchAdapter from './adapters/CarpenterFetchAdapter.js';
import '../../src/css/CarpenterElement.css';
import { ICarpenterComponent } from '../shared/Carpenter.types.js';
export default class CarpenterElement extends __LitElement {
    accessor src: string;
    accessor adapter: __CarpenterFetchAdapter | null;
    accessor _currentComponent: ICarpenterComponent | null;
    accessor _currentComponentId: string;
    private _specs;
    private _$iframe?;
    constructor();
    /**
     * @name      isDaemon
     * @type      Boolean
     * @get
     *
     * Return true if the component runs into the iframe (in deamon mode)
     *
     * @since     1.0.0
     */
    get isDaemon(): boolean;
    get $iframeDocument(): Document | null | undefined;
    mount(): Promise<void>;
    private _initListeners;
    registerComponent(component: ICarpenterComponent): void;
    private _initEnvironment;
    private _injectCarpenterDeamon;
    private _findInSchema;
    private _renderComponentValueEditWidget;
    private _applyUpdate;
    private _renderComponentValuesPreview;
    protected render(): import("lit-html").TemplateResult<1> | undefined;
}
