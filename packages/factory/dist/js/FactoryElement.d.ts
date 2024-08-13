import __LitElement from '@lotsof/litElement';
import '../../src/css/FactoryElement.css';
import { IFactoryComponent, IFactorySpecs } from '../shared/factory.types.js';
export default class FactoryElement extends __LitElement {
    src: string;
    specs: IFactorySpecs;
    _currentComponent: IFactoryComponent | null;
    _currentComponentId: string;
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
    get currentEngine(): string | undefined;
    get currentComponentId(): string | undefined;
    private _fetchSpecs;
    get $iframeDocument(): Document | null | undefined;
    mount(): Promise<void>;
    private _initListeners;
    registerComponent(component: IFactoryComponent): void;
    private _initEnvironment;
    private _setIframeContent;
    private _injectFactoryDeamon;
    private _applyUpdate;
    private _renderComponentInIframe;
    selectComponent(id: string, engine?: string): void;
    private _renderComponents;
    private _renderSidebar;
    render(): import("lit-html").TemplateResult<1>;
}
