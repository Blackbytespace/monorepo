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
import '@fontsource/poppins';
import '@lotsof/json-schema-form';
import __LitElement from '@lotsof/lit-element';
import { __iframeAutoSize, __injectHtml } from '@lotsof/sugar/dom';
import { __isInIframe } from '@lotsof/sugar/is';
import { __hotkey } from '@lotsof/sugar/keyboard';
import { html } from 'lit';
import { property, state } from 'lit/decorators.js';
import '../../src/css/FactoryElement.css';
import '../../src/css/index.css';
const __saveComponentValuesSchema = {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    $id: 'saveValues',
    title: 'Save values',
    description: 'Simply save the actual component values to use them later',
    type: 'object',
    properties: {
        name: {
            type: 'string',
            title: 'Name',
            description: 'Unique name to identify the saved values',
            minLength: 5,
            placeholder: 'Complete with video and slider',
            autofocus: true,
        },
    },
};
export default class CarpenterElement extends __LitElement {
    constructor() {
        super('s-carpenter');
        this.mediaQueries = {};
        this.mediaQuery = 'desktop';
        this.darkModeClass = '-dark';
        this._notifications = [];
        this._currentComponent = null;
        this._currentComponentId = '';
        this._currentMediaQuery = '';
        this._currentAction = null;
        this._state = {};
        this.saveState = true;
    }
    get currentMediaQuery() {
        return this.mediaQueries[this._currentMediaQuery];
    }
    update(changedProperties) {
        var _a, _b, _c, _d;
        super.update(changedProperties);
        // update the media query
        if (changedProperties.has('_currentMediaQuery')) {
            if (((_a = this.currentMediaQuery) === null || _a === void 0 ? void 0 : _a.max) !== -1) {
                (_b = this._$canvas) === null || _b === void 0 ? void 0 : _b.style.setProperty('--s-carpenter-canvas-width', ((_c = this.currentMediaQuery) === null || _c === void 0 ? void 0 : _c.max) + 'px');
            }
            else {
                (_d = this._$canvas) === null || _d === void 0 ? void 0 : _d.style.removeProperty('--s-carpenter-canvas-width');
            }
            setTimeout(() => {
                this._updateIframeSize();
            }, 300);
        }
    }
    _updateMediaQueries() {
        var _a, _b, _c, _d;
        // get the computed style of the document (iframe)
        const style = (_b = (_a = this._$iframe) === null || _a === void 0 ? void 0 : _a.contentWindow) === null || _b === void 0 ? void 0 : _b.getComputedStyle((_c = this.$iframeDocument) === null || _c === void 0 ? void 0 : _c.body);
        // try to get the media queries from the css variables (sugarcss)
        ['mobile', 'tablet', 'desktop', 'wide'].forEach((media) => {
            var _a, _b;
            const min = parseInt((_a = style === null || style === void 0 ? void 0 : style.getPropertyValue(`--s-media-${media}-min`)) !== null && _a !== void 0 ? _a : '0'), max = parseInt((_b = style === null || style === void 0 ? void 0 : style.getPropertyValue(`--s-media-${media}-max`)) !== null && _b !== void 0 ? _b : '0');
            if (min || max) {
                const query = {
                    name: media,
                    min: min ? min : -1,
                    max: max ? max : -1,
                };
                this.mediaQueries[media] = query;
            }
        });
        // init the media query if not set
        if (!this._currentMediaQuery &&
            Object.keys((_d = this.mediaQueries) !== null && _d !== void 0 ? _d : {}).length) {
            this._currentMediaQuery = Object.keys(this.mediaQueries)[0];
        }
        // make sure we update the UI
        this.requestUpdate();
    }
    get $iframeDocument() {
        var _a;
        return (_a = this._$iframe) === null || _a === void 0 ? void 0 : _a.contentDocument;
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            // if not in an iframe, init the environment
            // by creating an iframe and load the factory deamon
            // inside it
            if (__isInIframe()) {
                return;
            }
            // fetch the specs
            // await this._fetchSpecs();
            // load the environment by
            // creating the iframe etc...
            yield this._initEnvironment();
            // init the listeners like escape key, etc...
            this._initListeners(document);
            this._initListeners(this.$iframeDocument);
            // // render component if the current component is set
            // if (this.currentComponentId) {
            //   this._updateComponent(this.currentComponentId, this.currentEngine);
            // }
            // restore the ui mode (light/dark)
            this._restoreUiMode();
        });
    }
    _initListeners(context) {
        // popstate
        window.addEventListener('popstate', (e) => {
            if (e.state.id) {
                this._currentComponentId = e.state.id;
            }
        });
        // show/hide UI
        context.addEventListener('keydown', (e) => {
            switch (true) {
                case e.key === '§':
                    this.classList.add('-show-ui');
                    break;
            }
        });
        context.addEventListener('keyup', (e) => {
            var _a;
            switch (true) {
                case e.key === '§':
                    this.classList.remove('-show-ui');
                    e.preventDefault();
                    (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.blur();
                    break;
            }
        });
        const hotkeySettings = {
            ctx: context,
        };
        __hotkey('escape', (e) => {
            this._currentAction = null;
        }, hotkeySettings);
        __hotkey('cmd+s', (e) => {
            this._currentAction = 'saveValues';
        }, hotkeySettings);
        // __hotkey(
        //   'cmd+r',
        //   (e) => {
        //     this.randomizeComponentValues(this.currentComponentId as string);
        //   },
        //   hotkeySettings,
        // );
        __hotkey('cmd+m', (e) => {
            this.toggleUiMode();
        }, hotkeySettings);
    }
    _initEnvironment() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        this.log(`Init the carpenter environment...`);
        // move the component into the body
        document.body.appendChild(this);
        // create the canvas
        const $canvas = document.createElement('div');
        $canvas.classList.add(...this.cls('_canvas'));
        this.appendChild($canvas);
        // create the iframe
        const $iframe = document.createElement('iframe');
        $iframe.classList.add(...this.cls('_iframe'));
        __iframeAutoSize($iframe, { width: false, height: true });
        this._$iframe = $iframe;
        // listen for the iframe to be loaded
        $iframe.addEventListener('load', () => {
            this._updateMediaQueries();
        });
        // append the iframe to the body
        $canvas.appendChild($iframe);
        // copy the document into the iframe
        (_a = $iframe === null || $iframe === void 0 ? void 0 : $iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.document.open();
        (_b = $iframe === null || $iframe === void 0 ? void 0 : $iframe.contentWindow) === null || _b === void 0 ? void 0 : _b.document.write(document.documentElement.outerHTML);
        (_c = $iframe === null || $iframe === void 0 ? void 0 : $iframe.contentWindow) === null || _c === void 0 ? void 0 : _c.document.close();
        (_e = (_d = this.$iframeDocument) === null || _d === void 0 ? void 0 : _d.querySelector(`.${this.cls('_iframe')}`)) === null || _e === void 0 ? void 0 : _e.remove();
        (_g = (_f = this.$iframeDocument) === null || _f === void 0 ? void 0 : _f.querySelector(this.tagName)) === null || _g === void 0 ? void 0 : _g.remove();
        // center the content in the iframe
        const $centerStyle = (_j = (_h = this._$iframe) === null || _h === void 0 ? void 0 : _h.contentDocument) === null || _j === void 0 ? void 0 : _j.createElement('style');
        $centerStyle.innerHTML = `
      body {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `;
        (_k = $iframe.contentWindow) === null || _k === void 0 ? void 0 : _k.document.head.appendChild($centerStyle);
        // // inject the actual website assets into the iframe
        // for (let [key, value] of Object.entries(
        //   this.specs?.config?.project?.assets ?? {},
        // )) {
        //   switch (true) {
        //     case value.includes('.js') || value.includes('.ts'):
        //       const $script = this._$iframe?.contentDocument?.createElement(
        //         'script',
        //       ) as HTMLScriptElement;
        //       $script.src = value;
        //       $script?.setAttribute('type', 'module');
        //       this._$iframe?.contentDocument?.head.appendChild($script);
        //       break;
        //     case value.includes('.css'):
        //       const $link = this._$iframe?.contentDocument?.createElement(
        //         'link',
        //       ) as HTMLLinkElement;
        //       $link.href = value;
        //       $link.rel = 'stylesheet';
        //       this._$iframe?.contentDocument?.head.appendChild($link);
        //       break;
        //   }
        // }
        // empty page
        document
            .querySelectorAll(`body > *:not(${this.tagName}):not(script):not(.${this.cls('_canvas')})`)
            .forEach(($el) => {
            $el.remove();
        });
    }
    _setIframeContent(html) {
        var _a;
        if (!((_a = this._$iframe) === null || _a === void 0 ? void 0 : _a.contentDocument)) {
            return;
        }
        __injectHtml(this._$iframe.contentDocument.body, html);
        // @TODO    find a better way to resize the iframe correctly
        setTimeout(this._updateIframeSize.bind(this), 50);
        setTimeout(this._updateIframeSize.bind(this), 100);
        setTimeout(this._updateIframeSize.bind(this), 200);
    }
    _updateIframeSize() {
        var _a;
        (_a = this._$iframe) === null || _a === void 0 ? void 0 : _a.dispatchEvent(new CustomEvent('load', {
            bubbles: true,
            cancelable: false,
        }));
    }
    // private async _updateComponent(id: string, engine?: string): Promise<void> {
    //   const component: TCarpenterComponent = this.specs.components[id];
    //   if (!component) {
    //     return;
    //   }
    //   let url = `/api/render/${id}`;
    //   if (engine) {
    //     url += `/${engine}`;
    //   }
    //   const request = await fetch(url, {
    //       method: 'POST',
    //       body: JSON.stringify({
    //         values: this.currentComponent?.values ?? {},
    //       }),
    //     }),
    //     json = await request.json();
    //   component.values = json.values;
    //   this._setIframeContent(json.html);
    //   this.requestUpdate();
    // }
    // public getComponentById(id: string): TCarpenterComponent | undefined {
    //   return this.specs.components[id];
    // }
    // public selectComponent(id: string, engine?: string): void {
    //   // compose the url
    //   let url = `/component/${id}`;
    //   if (engine) {
    //     url += `/${engine}`;
    //   }
    //   // maintain the history
    //   history.pushState({ id, engine }, '', url);
    //   // set the current component
    //   this._currentComponentId = id;
    //   // render the new component
    //   this._updateComponent(id, engine);
    // }
    // public setComponentValues(id: string, values: any): void {
    //   const component = this.getComponentById(id);
    //   if (!component) {
    //     return;
    //   }
    //   component.values = values;
    //   this._updateComponent(component.name, this.currentEngine);
    // }
    toggleUiMode() {
        this.setUiMode(this.state.mode === 'dark' ? 'light' : 'dark');
    }
    _restoreUiMode() {
        if (this.state.mode) {
            this.setUiMode(this.state.mode);
        }
    }
    setUiMode(mode) {
        this.setState({ mode });
        if (mode === 'light') {
            document.body.classList.remove('-dark');
        }
        else {
            document.body.classList.add('-dark');
        }
    }
    // public randomizeComponentValues(id: string): void {
    //   const component = this.getComponentById(id);
    //   if (!component) {
    //     return;
    //   }
    //   // update the component with empty values
    //   component.values = {};
    //   this._updateComponent(component.name, this.currentEngine);
    // }
    // private async _saveComponentValues(
    //   component: TCarpenterComponent,
    //   name: String,
    // ): Promise<void> {
    //   // post the new values to the server
    //   const request = await fetch(`/api/saveValues/${component.name}`, {
    //       method: 'POST',
    //       body: JSON.stringify({
    //         name,
    //         values: component.values,
    //       }),
    //     }),
    //     json = await request.json();
    //   if (json.errors) {
    //     console.error(json.errors);
    //     return;
    //   }
    //   // update specs
    //   await this._fetchSpecs();
    //   // remove the popin
    //   this._currentAction = null;
    //   // @TODO   send a notification
    //   this._sendNotification({
    //     id: 'valuesSaved',
    //     message: `Values saved as ${name}`,
    //     type: 'success',
    //     timeout: 2000,
    //   });
    // }
    selectMediaQuery(name) {
        this._currentMediaQuery = name;
    }
    // private async _applyUpdate(update: TCarpenterUpdateObject): Promise<void> {
    //   // set the value into the component
    //   __set(this.currentComponent?.values, update.path, update.value);
    //   // update the component
    //   this._updateComponent(
    //     this.currentComponentId as string,
    //     this.currentEngine,
    //   );
    // }
    _sendNotification(notification) {
        return __awaiter(this, void 0, void 0, function* () {
            this._notifications.push(notification);
            if (notification.timeout) {
                setTimeout(() => {
                    this._notifications = this._notifications.filter((n) => n !== notification);
                }, notification.timeout);
            }
        });
    }
    _renderMediaQueries() {
        return html `<nav class="${this.cls('_media-queries')}">
      <ol class="${this.cls('_media-queries-list')}">
        ${Object.entries(this.mediaQueries).map(([name, query]) => html `
            <li
              class="${this.cls('_media-queries-list-item')} ${this
            ._currentMediaQuery === name
            ? '-active'
            : ''}"
              @pointerup=${() => {
            this._currentMediaQuery = name;
        }}
            >
              <span class="${this.cls('_media-queries-list-item-name')}"
                >${query.name}</span
              >
            </li>
          `)}
      </ol>
    </nav>`;
    }
    _renderMode() {
        return html `
      <button
        class="${this.cls('_bottombar-mode')} ${this.state.mode === 'dark'
            ? '-active'
            : ''}"
        @pointerup=${() => {
            this.toggleUiMode();
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
          <path
            d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"
          />
        </svg>
      </button>
    `;
    }
    _renderBottombar() {
        return html `<nav class="${this.cls('_bottombar')}">
      ${this._renderMediaQueries()} ${this._renderMode()}
    </nav>`;
    }
    _renderNotifications() {
        if (!this._notifications.length) {
            return;
        }
        return html `
      <div class="${this.cls('_notifications')}">
        <ul class="${this.cls('_notifications-list')}">
          ${this._notifications.map((notification) => html `
              <li
                class="${this.cls('_notifications-item')} ${notification.type
            ? `-${notification.type}`
            : ''}"
              >
                <span class="${this.cls('_notifications-message')}">
                  ${notification.message}
                </span>
              </li>
            `)}
      </div>
    `;
    }
    _renderEditor() {
        // .schema=${this.currentComponent?.schema}
        // .values=${this.currentComponent?.values ?? {}}
        return html `<div class="${this.cls('_editor')}">
      <div class="${this.cls('_editor-inner')}">
        <s-json-schema-form
          id="s-factory-json-schema-form"
          @sJsonSchemaForm.update=${(e) => {
            // this._applyUpdate({
            //   ...e.detail.update,
            //   component: this._currentComponent,
            // });
        }}
          id="s-factory-json-schema-form"
          name="s-factory-json-schema-form"
          .buttonClasses=${true}
          .formClasses=${true}
          .verbose=${this.verbose}
        ></s-json-schema-form>
      </div>
    </div>`;
    }
    render() {
        return html ` ${this._renderBottombar()} ${this._renderNotifications()} `;
    }
}
__decorate([
    property({ type: Object })
], CarpenterElement.prototype, "mediaQueries", void 0);
__decorate([
    property({ type: String })
], CarpenterElement.prototype, "mediaQuery", void 0);
__decorate([
    property({ type: String })
], CarpenterElement.prototype, "darkModeClass", void 0);
__decorate([
    state()
], CarpenterElement.prototype, "_notifications", void 0);
__decorate([
    state()
], CarpenterElement.prototype, "_currentComponent", void 0);
__decorate([
    state()
], CarpenterElement.prototype, "_currentComponentId", void 0);
__decorate([
    state()
], CarpenterElement.prototype, "_currentMediaQuery", void 0);
__decorate([
    state()
], CarpenterElement.prototype, "_currentAction", void 0);
__decorate([
    state()
], CarpenterElement.prototype, "_state", void 0);
CarpenterElement.define('s-carpenter');
//# sourceMappingURL=CarpenterElement.js.map