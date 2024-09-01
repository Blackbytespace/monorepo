import { LitElement as __LitElement, html as __html } from 'lit';
import { TWhenInViewportResult } from '../../../sugar/dist/js/dom/when/whenInViewport.js';
export { __html as html };
export type TLitElementDispatchSettings = {
    $elm: HTMLElement;
    bubbles: boolean;
    cancelable: boolean;
    detail: any;
};
export type TClassesSchema = 'slim' | 'full';
export type TLitElementState = {
    status: 'idle' | 'error';
    [key: string]: any;
};
export type TLitElementDefineSettings = {
    window?: any;
};
export type TSLitElementDefaultProps = {
    id: string;
    lnf: string;
    verbose: boolean;
    prefixEvent: boolean;
    activeWhen: 'inViewport'[];
    mountWhen: 'direct' | 'inViewport' | 'nearViewport' | 'interact' | 'visible' | 'domReady';
    adoptStyle: boolean;
    saveState: boolean;
    stateId: string;
    shadowDom: boolean;
    classesSchema: TClassesSchema;
    [key: string]: any;
};
export type TSLitElementSettings = {};
/**
 * @name            LitElement
 * @type            Class
 *
 * This class represent a custom HTMLElement that extends the LitElement class from the lit library.
 * It adds some cool features like the ability to wait for the component to be in the viewport before
 * actually instanciate it, etc...
 *
 * @param       {String}        internalName        The internal name of the component
 * @param       {TSLitElementDefaultProps}        props        The default props to apply to the component
 *
 * @attribute       {String}        id              The id of the component
 * @attribute       {String}        name            The name of the component
 * @attribute       {Boolean}       [verbose=false]         Specify if the component should be verbose or not
 * @attribute       {'inViewport'[]}      [activeWhen=[]]      Specify when the component is considered as active
 * @attribute       {'direct'|'inViewport'|'nearViewport'|'interact'|'visible'|'domReady'}      [mountWhen='direct']      Specify when the component should be mounted
 * @attribute       {Boolean}       [prefixEvent=true]      Specify if the event dispatched by the component should be prefixed by the component name
 * @attribute       {Boolean}       [adoptStyle=true]       Specify if the component should adopt the styles of the context when the shadow dom is used
 * @attribute       {Boolean}       [saveState=false]       Specify if the state of the component should be saved in the localStorage
 * @attribute       {String}        [stateId='']            Specify the id to use to save the state in the localStorage
 * @attribute       {Boolean}       [shadowDom=false]       Specify if the component should use the shadow dom or not
 *
 * @since           1.0.0
 */
export default class LitElement extends __LitElement {
    static _keepInjectedCssBeforeStylesheetLinksInited: boolean;
    static _defaultProps: Record<string, Record<string, any>>;
    id: string | undefined;
    name: string;
    verbose: boolean;
    activeWhen: 'inViewport'[];
    mountWhen: 'direct' | 'inViewport' | 'nearViewport' | 'interact' | 'visible' | 'domReady';
    prefixEvent: boolean;
    adoptStyle: boolean;
    saveState: boolean;
    stateId: string;
    shadowDom: boolean;
    classesSchema: TClassesSchema;
    protected _internalName: string;
    _shouldUpdate: boolean;
    _isInViewport: boolean;
    _whenInViewportPromise: TWhenInViewportResult;
    protected _state: any;
    get state(): LitElement['_state'];
    set state(state: LitElement['_state']);
    /**
     * @name            define
     * @type            Function
     * @static
     *
     * This static method allows you to define a custom element just like the `customElement.define` does.
     * The trick is that this define method will not initialize the component directly. It will
     * wait until it is near the viewport before actually creating a new element names "%tagName-up".
     * This will be the custom element that is registered and that will replace your "%tagName" HTMLElement.
     *
     * @param
     * @param       {Any}           props          The initial props to apply to your custom element
     * @param       {String}        tagName         The tagname you want to search in the DOM
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    static define(tagName: string, props?: any, settings?: Partial<TLitElementDefineSettings>): void;
    /**
     * @name            setDefaultProps
     * @type            Function
     * @static
     *
     * This static method allows you to set some default props for some particular
     * component(s). You can target components using simple css selectorl like "my-component#cool".
     * Once the component is instanciated, it will check if some defaults are specified and
     * extends them with the passed props.
     *
     * @param     {String|String[]}      selector      The selector to use to target elements on which these props will be applied
     * @param     {Any}         props         An object of props you want to set defaults for
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    static setDefaultProps(selector: string | string[], props: any): void;
    static _injectedStyles: string[];
    injectStyle(css: any, id?: string): void;
    /**
     * @name            getDefaultProps
     * @type            Function
     * @static
     *
     * This static method allows you to get back some default props setted for a component/feature, etc...
     *
     * @param     {String|String[]}      selector      The selector to use to target elements on which these props will be applied
     * @return    {Any}                                 Some default props setted or an empty object
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    static getDefaultProps(selector: string): any;
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    constructor(internalName: string, props?: TSLitElementDefaultProps);
    connectedCallback(): void;
    /**
     * @name           setState
     * @type            Function
     *
     * This method allows you to set the state of the component.
     * It will merge the new state with the existing one.
     * This state will be saved in the localStorage if the "saveState" attribute is set to true.
     *
     * @param           {Partial<LitElement['_state']>}          newState          The new state to set
     *
     * @since           1.0.0
     */
    setState(newState: Partial<LitElement['_state']>): void;
    log(...args: any[]): void;
    _getDocumentFromElement($elm: any): any;
    /**
     * @name           dispatch
     * @type            Function
     *
     * This method allows you to dispatch some CustomEvents from your component node itself.
     *
     * If the "prefixEvent" attribute is set to true, the event will be dispatched with the following names:
     * 1. An event called "%internalName.%eventName"
     * 2. An event called "%name.%eventName" if the "name" property is setted
     * 3. An event called "%tagName.%eventName" if the tagName is different from the internalName
     *
     * Otherwise, the event will be dispatched with the following names:
     * 1. An event called "%eventName"
     *
     * @param           {String}            eventName     The event name to dispatch
     * @param           {TLitElementDispatchSettings}          [settings={}]     The settings to use for the dispatch
     *
     * @since           1.0.0
     */
    dispatch(eventName: string, settings?: Partial<TLitElementDispatchSettings>): void;
    private _adoptStyleInShadowRoot;
    /**
     * @name          internalCls
     * @type          Function
     *
     * This method allows you to get a class that is based in on the internalName of the component.
     * This is useful to query some element(s) inside your component that used the `cls` method.
     *
     * @param         {String}        cls         The class you want to process. Can be multiple classes separated by a space. If null, does not print any class at all but the "style" one
     * @return        {String}                    The generated internalName based class that you can apply
     *
     * @since         1.0.0
     */
    internalCls(cls?: string): string;
    /**
     * @name          cls
     * @type          Function
     *
     * This method allows you to get a class that is based on the tagName of the component.
     *
     * If the "classesSchema" attribute is set to "full", the class will be generated like this:
     * 1. %internalName_%lowerCaseClassName
     * 2. %tagName_%lowerCaseClassName if the tagName is different from the internalName
     * 3. %name_%lowerCaseClassName if the "name" property is setted
     *
     * If the "classesSchema" attribute is set to "slim", the class will be generated like this:
     * 1. _%lowerCaseClassName
     *
     * @param         {String}        cls         The class you want to process. Can be multiple classes separated by a space. If null, does not print any class at all but the "style" one
     * @param         {TClassesSchema}       [classesSchema=this.classesSchema]         The schema to use to generate the class. Can be "slim" or "full"
     * @return        {String[]}                    The generated class(es) that you can apply
     *
     * @since         1.0.0
     */
    cls(cls?: string, classesSchema?: TClassesSchema): string[];
    private _waitAndExecute;
    /**
     * @name            isActive
     * @type            Function
     *
     * true if the component is active or not. A component is active when
     *
     * @since   2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    isActive(): boolean;
    /**
     * @name      isMounted
     * @type      Function
     *
     * This method returns true if the component is mounted, false if not
     *
     * @return    {Boolean}       true if is mounted, false if not
     *
     * @since     1.0.0
     */
    isMounted(): any;
    /**
     * @name            isInViewport
     * @type            Function
     *
     * true if the component is in the viewport, false if not
     *
     * @return         {Boolean}       true if in the viewport, false if not
     *
     * @since           1.0.0
     */
    isInViewport(): boolean;
    /**
     * @name            mount
     * @type            Function
     * @async
     *
     * This method allows you to actually mount your feature behavior.
     * It will be called depending on the "mountWhen" setting setted.
     *
     * @since           1.0.0
     */
    protected mount(): void;
    private _mount;
    disconnectedCallback(): void;
}
