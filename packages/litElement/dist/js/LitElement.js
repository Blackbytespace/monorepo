var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __wait } from '@lotsof/sugar/datetime';
import { __adoptStyleInShadowRoot, __injectStyle, __querySelectorLive, __when, } from '@lotsof/sugar/dom';
import { __unique } from '@lotsof/sugar/array';
import { __isInViewport } from '@lotsof/sugar/is';
import { __camelCase } from '@lotsof/sugar/string';
import { LitElement as __LitElement, html as __html } from 'lit';
import { property } from 'lit/decorators.js';
export { __html as html };
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
class LitElement extends __LitElement {
    get state() {
        var _a;
        const stateId = this.stateId || this.id;
        if (this.saveState && stateId) {
            try {
                const savedState = JSON.parse((_a = localStorage.getItem(stateId)) !== null && _a !== void 0 ? _a : '{}');
                return savedState;
            }
            catch (e) { }
        }
        return this._state;
    }
    set state(state) {
        Object.assign(this._state, state);
        const stateId = this.stateId || this.id;
        if (this.saveState && stateId) {
            localStorage.setItem(stateId, JSON.stringify(this._state));
        }
    }
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
    static define(tagName, props = {}, settings = {}) {
        var _a;
        if (!tagName) {
            throw new Error(`You have to specify a tagName to the ${this.name}.define method...`);
        }
        // set the default props
        LitElement.setDefaultProps(tagName, props);
        const win = (_a = settings.window) !== null && _a !== void 0 ? _a : window;
        if (win.customElements.get(tagName.toLowerCase())) {
            return;
        }
        // @ts-ignore
        win.customElements.define(tagName.toLowerCase(), class extends this {
        });
    }
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
    static setDefaultProps(selector, props) {
        selector = Array.isArray(selector) ? selector : [selector];
        selector.forEach((sel) => {
            var _a;
            this._defaultProps[sel] = Object.assign(Object.assign({}, ((_a = this._defaultProps[sel]) !== null && _a !== void 0 ? _a : {})), props);
        });
    }
    injectStyle(css, id = this.tagName) {
        // @ts-ignore
        if (this.constructor._injectedStyles.indexOf(id) !== -1)
            return;
        // @ts-ignore
        this.constructor._injectedStyles.push(id);
        __injectStyle(css, {
            id,
        });
    }
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
    static getDefaultProps(selector) {
        var _a, _b;
        return Object.assign(Object.assign({}, ((_a = this._defaultProps['*']) !== null && _a !== void 0 ? _a : {})), ((_b = this._defaultProps[selector]) !== null && _b !== void 0 ? _b : {}));
    }
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
    constructor(internalName, props) {
        var _a, _b, _c, _d, _e;
        super();
        this.id = undefined;
        this.lnf = false;
        this.name = '';
        this.verbose = false;
        this.activeWhen = ['inViewport'];
        this.mountWhen = 'direct';
        this.prefixEvent = true;
        this.adoptStyle = true;
        this.saveState = false;
        this.stateId = '';
        this.shadowDom = false;
        this.classesSchema = 'slim';
        this._internalName = this.tagName.toLowerCase();
        this._shouldUpdate = false;
        this._listenersMap = new Map();
        this._state = {};
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
        this._LitElementMounted = false;
        if (internalName) {
            this._internalName = internalName;
        }
        // set the id as property
        this.setAttribute('id', (_a = this.id) !== null && _a !== void 0 ? _a : `s-${Math.round(Math.random() * 9999)}`);
        // @ts-ignore
        const nodeFirstUpdated = (_b = this.firstUpdated) === null || _b === void 0 ? void 0 : _b.bind(this);
        // @ts-ignore
        this.firstUpdated = () => __awaiter(this, void 0, void 0, function* () {
            if (nodeFirstUpdated) {
                // @ts-ignore
                yield nodeFirstUpdated();
            }
        });
        // litElement shouldUpdate
        // @ts-ignore
        const nodeShouldUpdate = (_c = this.shouldUpdate) === null || _c === void 0 ? void 0 : _c.bind(this);
        // @ts-ignore
        this.shouldUpdate = () => {
            if (nodeShouldUpdate) {
                // @ts-ignore
                const res = nodeShouldUpdate();
                if (!res)
                    return false;
            }
            return this._shouldUpdate;
        };
        const defaultProps = Object.assign(Object.assign(Object.assign({}, LitElement.getDefaultProps(internalName.toLowerCase())), LitElement.getDefaultProps(this.tagName.toLowerCase())), (props !== null && props !== void 0 ? props : {}));
        const mountWhen = (_e = (_d = this.getAttribute('mountWhen')) !== null && _d !== void 0 ? _d : defaultProps.mountWhen) !== null && _e !== void 0 ? _e : 'direct';
        // wait until mount
        this._waitAndExecute(mountWhen, () => {
            this._mount();
        });
    }
    connectedCallback() {
        // default props
        const defaultProps = LitElement.getDefaultProps(this.tagName.toLowerCase());
        for (let [name, value] of Object.entries(defaultProps)) {
            this[name] = value;
        }
        // add back the listeners
        for (let [$elm, listenersObj] of this._listenersMap.entries()) {
            if (listenersObj.length) {
                listenersObj.forEach((listenerObj) => {
                    $elm.addEventListener(listenerObj.type, listenerObj.listener);
                });
            }
        }
        // component class
        this.classList.add(...this.cls(''));
        // shadow handler
        if (this.shadowDom === false) {
            // @ts-ignore
            this.createRenderRoot = () => {
                return this;
            };
        }
        // check if we need to inject the css into the
        // document that is not the same as the app one
        const doc = this._getDocumentFromElement(this);
        if (document !== doc && this.constructor.styles) {
            __injectStyle(this.constructor.styles, {
                rootNode: doc,
            });
        }
        // make sure the injected styles stays BEFORE the link[rel="stylesheet"]
        // to avoid style override
        if (!LitElement._keepInjectedCssBeforeStylesheetLinksInited) {
            const $firstStylesheetLink = document.head.querySelector('link[rel="stylesheet"]');
            __querySelectorLive('style', ($style) => {
                if ($firstStylesheetLink) {
                    document.head.insertBefore($style, $firstStylesheetLink);
                }
            }, {
                rootNode: document.head,
            });
            LitElement._keepInjectedCssBeforeStylesheetLinksInited = true;
        }
        super.connectedCallback();
    }
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
    setState(newState) {
        this.state = Object.assign(Object.assign({}, this.state), newState);
        this.requestUpdate();
    }
    log(...args) {
        if (this.verbose) {
            let logs = [];
            logs.push(`[${this.tagName.toLowerCase()}]`);
            if (this.id && this.id !== this.tagName.toLocaleLowerCase()) {
                logs.push(this.id);
            }
            logs = [...logs, ...args];
            console.log(...logs);
        }
    }
    _getDocumentFromElement($elm) {
        while ($elm.parentNode) {
            $elm = $elm.parentNode;
        }
        return $elm;
    }
    // /**
    //  * @name           addEventListener
    //  * @type            Function
    //  *
    //  * This method allows you to add an event listener on the component itself.
    //  * It will automatically remove the listener when the component is disconnected and added again when connected.
    //  *
    //  * @param           {String}            type            The event type to listen for
    //  * @param           {EventListenerOrEventListenerObject}          listener        The listener to call when the event is triggered
    //  * @param           {boolean|AddEventListenerOptions}          [options]       Some options to pass to the addEventListener method
    //  *
    //  * @since           1.0.0
    //  */
    // addEventListener(
    //   type: string,
    //   listener: EventListenerOrEventListenerObject,
    //   options?: boolean | AddEventListenerOptions,
    // ): void {
    //   this.addEventListenerOn(this as HTMLElement, type, listener, options);
    // }
    /**
     * @name           addEventListenerOn
     * @type            Function
     *
     * This method allows you to add an event listener on any element.
     * It will automatically remove the listener when the component is disconnected and added again when connected.
     *
     * @param           {HTMLElement}            $elm            The element on which to add the event listener
     * @param           {String}            type            The event type to listen for
     * @param           {EventListenerOrEventListenerObject}          listener        The listener to call when the event is triggered
     * @param           {boolean|AddEventListenerOptions}          [options]       Some options to pass to the addEventListener method
     *
     * @since           1.0.0
     */
    addEventListenerOn($elm, type, listener, options) {
        var _a;
        // protect
        if (!$elm) {
            return;
        }
        // get or create the listeners stack for this element
        let stack = (_a = this._listenersMap.get($elm)) !== null && _a !== void 0 ? _a : [];
        // add the listner into the element listeners stack
        stack.push({
            listener,
            type,
        });
        // register the event listener on the element
        if ($elm !== this) {
            $elm.addEventListener(type, listener, options);
        }
        // set the listeners stack into the map
        this._listenersMap.set($elm, stack);
    }
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
    dispatch(eventName, settings) {
        const finalSettings = Object.assign({ $elm: this, bubbles: true, cancelable: true, detail: {} }, (settings !== null && settings !== void 0 ? settings : {}));
        let eventsNames = [];
        let finalEventName = eventName;
        // use the passed eventName without touching it
        eventsNames.push(eventName);
        // prefix the event name with the internalName
        // if needed only
        if (!eventName.startsWith(`${this._internalName}.`)) {
            finalEventName = `${this._internalName}.${eventName}`;
            eventsNames.push(finalEventName);
            finalEventName = `${__camelCase(this._internalName)}.${eventName}`;
            eventsNames.push(finalEventName);
        }
        // prefix with the tagName
        // only if needed
        if (!eventName.startsWith(`${this.tagName}.`)) {
            finalEventName = `${this.tagName.toLowerCase()}.${eventName}`;
            eventsNames.push(finalEventName);
            finalEventName = `${__camelCase(this.tagName.toLowerCase())}.${eventName}`;
            eventsNames.push(finalEventName);
        }
        // ensure we don't have duplicates
        eventsNames = __unique(eventsNames);
        // dispatch all the events
        for (let eventName of eventsNames) {
            this.log(`Dispatching event "${eventName}"`);
            finalSettings.$elm.dispatchEvent(new CustomEvent(eventName, finalSettings));
        }
    }
    _adoptStyleInShadowRoot($shadowRoot, $context) {
        return __adoptStyleInShadowRoot($shadowRoot, $context);
    }
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
    internalCls(cls = '') {
        if (!cls) {
            return this._internalName;
        }
        let finalCls = this._internalName.toLowerCase();
        return `${finalCls}${cls && !cls.match(/^(_{1,2}|-)/) ? '-' : ''}${cls}`;
    }
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
    cls(cls = '', classesSchema = this.classesSchema) {
        let clsString = '';
        let finalClasses = [];
        if (!cls) {
            finalClasses.push(this.tagName.toLowerCase());
            if (this._internalName !== cls) {
                finalClasses.push(this._internalName.toLowerCase());
            }
            if (this.name && this.name !== this.tagName.toLowerCase()) {
                finalClasses.push(this.name.toLowerCase());
            }
            // ensure the toString method is correct
            finalClasses.toString = function () {
                return this.join(' ');
            };
            // return final classes
            return finalClasses;
        }
        // handle schema
        if (classesSchema === 'full') {
            clsString += `${this._internalName.toLowerCase()}`;
        }
        cls.split(' ').forEach((clsName) => {
            let clses = [];
            // internal name (always full schema)
            finalClasses.push(`${this._internalName.toLowerCase()}${clsName && !clsName.match(/^(_{1,2}|-)/) ? '-' : ''}${clsName}`);
            // class from the component tagname if wanted
            if (classesSchema === 'full') {
                finalClasses.push(`${this.tagName.toLowerCase()}${clsName && !clsName.match(/^(_{1,2}|-)/) ? '-' : ''}${clsName}`);
            }
            else {
                finalClasses.push(`${clsName && !clsName.match(/^(_{1,2}|-)/) ? '-' : ''}${clsName}`);
            }
            // if a special "name" is setted
            if (this.name && this.name !== this.tagName.toLowerCase()) {
                if (classesSchema === 'full') {
                    finalClasses.push(`${this.name.toLowerCase()}${clsName && !clsName.match(/^(_{1,2}|-)/) ? '-' : ''}${clsName}`);
                }
                else {
                    finalClasses.push(`${clsName && !clsName.match(/^(_{1,2}|-)/) ? '-' : ''}${clsName}`);
                }
            }
        });
        // sanitize
        finalClasses = finalClasses.map((c) => c.replace(/[\-]+/, '-'));
        finalClasses = __unique(finalClasses);
        // ensure the toString method is correct
        finalClasses.toString = function () {
            return this.join(' ');
        };
        // return final classes
        return finalClasses;
    }
    _waitAndExecute(when, callback) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(when)) {
                when = [when];
            }
            // wait
            if (!when.includes('direct')) {
                yield __when(this, when);
            }
            else {
                yield __wait();
            }
            callback === null || callback === void 0 ? void 0 : callback(this);
            resolve(this);
        }));
    }
    /**
     * @name            isActive
     * @type            Function
     *
     * true if the component is active or not. A component is active when
     *
     * @since   2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    isActive() {
        if (this.activeWhen.includes('inViewport') &&
            !__isInViewport(this)) {
            return false;
        }
        return true;
    }
    isMounted() {
        return this._LitElementMounted || this.hasAttribute('mounted');
    }
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
    isInViewport() {
        return __isInViewport(this);
    }
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
    mount() { }
    _mount() {
        return __awaiter(this, void 0, void 0, function* () {
            // make props responsive
            // this.utils.makePropsResponsive(this.props);
            var _a, _b;
            // verbose
            this.log('Mounting...');
            // "-lnf" class
            if (this.lnf) {
                this.classList.add(`-lnf`);
            }
            // custom mount function
            if (this.mount && typeof this.mount === 'function') {
                yield this.mount();
            }
            // set the not as updatable
            this._shouldUpdate = true;
            // @ts-ignore
            this.requestUpdate();
            // await this.updateComplete;
            this.injectStyle(
            // @ts-ignore
            (_b = (_a = this.constructor.styles) === null || _a === void 0 ? void 0 : _a.cssText) !== null && _b !== void 0 ? _b : '', this.tagName);
            if (this.adoptStyle && this.shadowRoot) {
                yield this._adoptStyleInShadowRoot(this.shadowRoot);
            }
            // set the component as mounted
            this.setAttribute('mounted', 'true');
            this._LitElementMounted = true;
            return true;
        });
    }
    disconnectedCallback() {
        for (let [$elm, listenersObj] of this._listenersMap.entries()) {
            if (listenersObj.length) {
                listenersObj.forEach((listenerObj) => {
                    $elm.removeEventListener(listenerObj.type, listenerObj.listener);
                });
            }
        }
        super.disconnectedCallback();
    }
}
LitElement._keepInjectedCssBeforeStylesheetLinksInited = false;
LitElement._defaultProps = {};
LitElement._injectedStyles = [];
export default LitElement;
__decorate([
    property({ type: String })
    // @ts-ignore
], LitElement.prototype, "id", void 0);
__decorate([
    property({ type: Boolean })
], LitElement.prototype, "lnf", void 0);
__decorate([
    property({ type: String })
], LitElement.prototype, "name", void 0);
__decorate([
    property({ type: Boolean })
], LitElement.prototype, "verbose", void 0);
__decorate([
    property({ type: Array })
], LitElement.prototype, "activeWhen", void 0);
__decorate([
    property({ type: String })
], LitElement.prototype, "mountWhen", void 0);
__decorate([
    property({ type: Boolean })
], LitElement.prototype, "prefixEvent", void 0);
__decorate([
    property({ type: Boolean })
], LitElement.prototype, "adoptStyle", void 0);
__decorate([
    property({ type: Boolean })
], LitElement.prototype, "saveState", void 0);
__decorate([
    property({ type: String })
], LitElement.prototype, "stateId", void 0);
__decorate([
    property({ type: Boolean })
], LitElement.prototype, "shadowDom", void 0);
__decorate([
    property({ type: String })
], LitElement.prototype, "classesSchema", void 0);
//# sourceMappingURL=LitElement.js.map