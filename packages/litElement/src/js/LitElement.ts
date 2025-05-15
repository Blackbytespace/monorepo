import { __wait } from '@lotsof/sugar/datetime';
import {
  __adoptStyleInShadowRoot,
  __injectStyle,
  __querySelectorLive,
  __when,
} from '@lotsof/sugar/dom';

import { __unique } from '@lotsof/sugar/array';
import { __isInViewport } from '@lotsof/sugar/is';
import { __camelCase } from '@lotsof/sugar/string';
import { LitElement as __LitElement, html as __html } from 'lit';
import { property } from 'lit/decorators.js';

export { __html as html };

export type TLitElementEventListenerObject = {
  listener: EventListenerOrEventListenerObject;
  type: string;
};

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
  mountWhen:
    | 'direct'
    | 'inViewport'
    | 'nearViewport'
    | 'interact'
    | 'visible'
    | 'domReady';
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
  static _keepInjectedCssBeforeStylesheetLinksInited = false;

  static _defaultProps: Record<string, Record<string, any>> = {};

  @property({ type: String })
  // @ts-ignore
  public id: string | undefined = undefined;

  @property({ type: Boolean })
  public lnf: boolean = false;

  @property({ type: String })
  public name: string = '';

  @property({ type: Boolean })
  public verbose: boolean = false;

  @property({ type: Array })
  public activeWhen: 'inViewport'[] = ['inViewport'];

  @property({ type: String })
  public mountWhen:
    | 'direct'
    | 'inViewport'
    | 'nearViewport'
    | 'interact'
    | 'visible'
    | 'domReady' = 'direct';

  @property({ type: Boolean })
  public prefixEvent: boolean = true;

  @property({ type: Boolean })
  public adoptStyle: boolean = true;

  @property({ type: Boolean })
  public saveState: boolean = false;

  @property({ type: String })
  public stateId: string = '';

  @property({ type: Boolean })
  public shadowDom: boolean = false;

  @property({ type: String })
  public classesSchema: TClassesSchema = 'slim';

  protected _internalName: string = this.tagName.toLowerCase();

  private _shouldUpdate = false;
  private _listenersMap: Map<
    HTMLElement | Document | Window,
    TLitElementEventListenerObject[]
  > = new Map();

  protected _state: any = {};
  get state(): LitElement['_state'] {
    const stateId = this.stateId || this.id;
    if (this.saveState && stateId) {
      try {
        const savedState = JSON.parse(localStorage.getItem(stateId) ?? '{}');
        return savedState;
      } catch (e) {}
    }
    return this._state;
  }
  set state(state: LitElement['_state']) {
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
  static define(
    tagName: string,
    props: any = {},
    settings: Partial<TLitElementDefineSettings> = {},
  ) {
    if (!tagName) {
      throw new Error(
        `You have to specify a tagName to the ${this.name}.define method...`,
      );
    }

    // set the default props
    LitElement.setDefaultProps(tagName, props);

    const win = settings.window ?? window;
    if (win.customElements.get(tagName.toLowerCase())) {
      return;
    }

    // @ts-ignore
    win.customElements.define(tagName.toLowerCase(), class extends this {});
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
  static setDefaultProps(selector: string | string[], props: any): void {
    selector = Array.isArray(selector) ? selector : [selector];
    selector.forEach((sel) => {
      this._defaultProps[sel] = {
        ...(this._defaultProps[sel] ?? {}),
        ...props,
      };
    });
  }

  static _injectedStyles: string[] = [];
  injectStyle(css, id = this.tagName) {
    // @ts-ignore
    if (this.constructor._injectedStyles.indexOf(id) !== -1) return;
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
  static getDefaultProps(selector: string): any {
    return {
      ...(this._defaultProps['*'] ?? {}),
      ...(this._defaultProps[selector] ?? {}),
    };
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
  constructor(internalName: string, props?: TSLitElementDefaultProps) {
    super();

    if (internalName) {
      this._internalName = internalName;
    }

    // set the id as property
    this.setAttribute('id', this.id ?? `s-${Math.round(Math.random() * 9999)}`);

    // @ts-ignore
    const nodeFirstUpdated = this.firstUpdated?.bind(this);
    // @ts-ignore
    this.firstUpdated = async () => {
      if (nodeFirstUpdated) {
        // @ts-ignore
        await nodeFirstUpdated();
      }
    };

    // litElement shouldUpdate
    // @ts-ignore
    const nodeShouldUpdate = this.shouldUpdate?.bind(this);
    // @ts-ignore
    this.shouldUpdate = () => {
      if (nodeShouldUpdate) {
        // @ts-ignore
        const res = nodeShouldUpdate();
        if (!res) return false;
      }
      return this._shouldUpdate;
    };

    const defaultProps = {
      ...LitElement.getDefaultProps(internalName.toLowerCase()),
      ...LitElement.getDefaultProps(this.tagName.toLowerCase()),
      ...(props ?? {}),
    };
    const mountWhen =
      this.getAttribute('mountWhen') ?? defaultProps.mountWhen ?? 'direct';

    // wait until mount
    this._waitAndExecute(mountWhen, () => {
      this._mount();
    });
  }

  connectedCallback(): void {
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
    if (document !== doc && (<typeof LitElement>this.constructor).styles) {
      __injectStyle((<typeof LitElement>this.constructor).styles, {
        rootNode: doc,
      });
    }

    // make sure the injected styles stays BEFORE the link[rel="stylesheet"]
    // to avoid style override
    if (!LitElement._keepInjectedCssBeforeStylesheetLinksInited) {
      const $firstStylesheetLink = document.head.querySelector(
        'link[rel="stylesheet"]',
      );
      __querySelectorLive(
        'style',
        ($style) => {
          if ($firstStylesheetLink) {
            document.head.insertBefore($style, $firstStylesheetLink);
          }
        },
        {
          rootNode: document.head,
        },
      );
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
  public setState(newState: Partial<LitElement['_state']>): void {
    this.state = {
      ...this.state,
      ...newState,
    };
    this.requestUpdate();
  }

  log(...args) {
    if (this.verbose) {
      let logs: any[] = [];
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
  addEventListenerOn(
    $elm: HTMLElement | Document | Window,
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void {
    // protect
    if (!$elm) {
      return;
    }

    // get or create the listeners stack for this element
    let stack: TLitElementEventListenerObject[] =
      this._listenersMap.get($elm) ?? [];

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
  public dispatch(
    eventName: string,
    settings?: Partial<TLitElementDispatchSettings>,
  ): void {
    const finalSettings: TLitElementDispatchSettings = {
      $elm: this as HTMLElement,
      bubbles: true,
      cancelable: true,
      detail: {},
      ...(settings ?? {}),
    };

    let eventsNames: string[] = [];
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
      finalEventName = `${__camelCase(
        this.tagName.toLowerCase(),
      )}.${eventName}`;
      eventsNames.push(finalEventName);
    }

    // ensure we don't have duplicates
    eventsNames = __unique(eventsNames);

    // dispatch all the events
    for (let eventName of eventsNames) {
      this.log(`Dispatching event "${eventName}"`);
      finalSettings.$elm.dispatchEvent(
        new CustomEvent(eventName, finalSettings),
      );
    }
  }

  private _adoptStyleInShadowRoot(
    $shadowRoot: ShadowRoot,
    $context?: HTMLElement | typeof document,
  ): Promise<any> {
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
  public internalCls(cls: string = ''): string {
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
  public cls(
    cls: string = '',
    classesSchema: TClassesSchema = this.classesSchema,
  ): string[] {
    let clsString = '';

    let finalClasses: string[] = [];

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
      let clses: string[] = [];
      // internal name (always full schema)
      finalClasses.push(
        `${this._internalName.toLowerCase()}${
          clsName && !clsName.match(/^(_{1,2}|-)/) ? '-' : ''
        }${clsName}`,
      );
      // class from the component tagname if wanted
      if (classesSchema === 'full') {
        finalClasses.push(
          `${this.tagName.toLowerCase()}${
            clsName && !clsName.match(/^(_{1,2}|-)/) ? '-' : ''
          }${clsName}`,
        );
      } else {
        finalClasses.push(
          `${clsName && !clsName.match(/^(_{1,2}|-)/) ? '-' : ''}${clsName}`,
        );
      }
      // if a special "name" is setted
      if (this.name && this.name !== this.tagName.toLowerCase()) {
        if (classesSchema === 'full') {
          finalClasses.push(
            `${this.name.toLowerCase()}${
              clsName && !clsName.match(/^(_{1,2}|-)/) ? '-' : ''
            }${clsName}`,
          );
        } else {
          finalClasses.push(
            `${clsName && !clsName.match(/^(_{1,2}|-)/) ? '-' : ''}${clsName}`,
          );
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

  private _waitAndExecute(
    when: string | string[],
    callback?: Function,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (!Array.isArray(when)) {
        when = [when];
      }

      // wait
      if (!when.includes('direct')) {
        await __when(this as HTMLElement, when);
      } else {
        await __wait();
      }

      callback?.(this);
      resolve(this);
    });
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
  isActive(): boolean {
    if (
      this.activeWhen.includes('inViewport') &&
      !__isInViewport(this as HTMLElement)
    ) {
      return false;
    }
    return true;
  }

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
  _LitElementMounted = false;
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
  isInViewport(): boolean {
    return __isInViewport(this as HTMLElement);
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
  protected mount() {}
  private async _mount() {
    // make props responsive
    // this.utils.makePropsResponsive(this.props);

    // verbose
    this.log('Mounting...');

    // "-lnf" class
    if (this.lnf) {
      this.classList.add(`-lnf`);
    }

    // custom mount function
    if (this.mount && typeof this.mount === 'function') {
      await this.mount();
    }

    // set the not as updatable
    this._shouldUpdate = true;
    // @ts-ignore
    this.requestUpdate();
    // await this.updateComplete;
    this.injectStyle(
      // @ts-ignore
      (<typeof LitElement>this.constructor).styles?.cssText ?? '',
      this.tagName,
    );
    if (this.adoptStyle && this.shadowRoot) {
      await this._adoptStyleInShadowRoot(this.shadowRoot);
    }

    // set the component as mounted
    this.setAttribute('mounted', 'true');
    this._LitElementMounted = true;

    return true;
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
