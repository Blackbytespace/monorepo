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
import __IconElement from '@lotsof/icon-element';
import '@lotsof/json-schema-form';
import __LitElement from '@lotsof/lit-element';
import { __injectHtml } from '@lotsof/sugar/dom';
import { __isInIframe } from '@lotsof/sugar/is';
import { __set } from '@lotsof/sugar/object';
import { html } from 'lit';
import { property, state } from 'lit/decorators.js';
import '../../src/css/output/carpenter.build.css';
import __CarpenterDaemonElement from './carpenterDaemon.element.js';
class CarpenterElement extends __LitElement {
    constructor() {
        super('s-carpenter');
        this.mediaQueries = {};
        this.mediaQuery = 'desktop';
        this.darkModeClass = '-dark';
        this._notifications = [];
        this._currentMediaQuery = '';
        this._currentAction = null;
        this._state = {};
        this.saveState = true;
    }
    static registerAdapter(id, adapter) {
        if (this._adapters[id]) {
            throw new Error(`[s-carpenter] An adapter with id "${id}" already exists`);
        }
        this._adapters[id] = adapter;
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
    // private _updateMediaQueries(): void {
    //   // get the computed style of the document (iframe)
    //   const style = this._$iframe?.contentWindow?.getComputedStyle(
    //     this.$iframeDocument?.body as Element,
    //   );
    //   // try to get the media queries from the css variables (sugarcss)
    //   ['mobile', 'tablet', 'desktop', 'wide'].forEach((media) => {
    //     const min = parseInt(
    //         style?.getPropertyValue(`--s-media-${media}-min`) ?? '0',
    //       ),
    //       max = parseInt(
    //         style?.getPropertyValue(`--s-media-${media}-max`) ?? '0',
    //       );
    //     if (min || max) {
    //       const query: TCarpenterMediaQuery = {
    //         name: media,
    //         min: min ? min : -1,
    //         max: max ? max : -1,
    //       };
    //       this.mediaQueries[media] = query;
    //     }
    //   });
    //   // init the media query if not set
    //   if (
    //     !this._currentMediaQuery &&
    //     Object.keys(this.mediaQueries ?? {}).length
    //   ) {
    //     this._currentMediaQuery = Object.keys(this.mediaQueries)[0];
    //   }
    //   // make sure we update the UI
    //   this.requestUpdate();
    // }
    get $iframeDocument() {
        var _a;
        return (_a = this._$iframe) === null || _a === void 0 ? void 0 : _a.contentDocument;
    }
    get $iframe() {
        return this._$iframe;
    }
    firstUpdated(_changedProperties) {
        var _a, _b;
        // get the daemon reference
        const $daemon = document.querySelector('s-carpenter-daemon');
        (_b = (_a = this._$iframe) === null || _a === void 0 ? void 0 : _a.contentDocument) === null || _b === void 0 ? void 0 : _b.body.appendChild($daemon);
        this._$daemon = $daemon;
        // init the daemon listeners
        this._initDaemonListeners();
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            // if not in an iframe, init the environment
            // by creating an iframe and load the factory deamon
            // inside it
            if (__isInIframe()) {
                return;
            }
            // load the environment by
            // creating the iframe etc...
            yield this._initEnvironment();
            // init the listeners like escape key, etc...
            this._initListeners(document);
            this._initListeners(this.$iframeDocument);
        });
    }
    _initDaemonListeners() {
        var _a;
        // listen for edit event from the daemon
        (_a = this._$daemon) === null || _a === void 0 ? void 0 : _a.addEventListener('s-carpenter-daemon.edit', (e) => {
            this.dispatch('edit', {
                bubbles: true,
                detail: e.detail,
            });
        });
    }
    _initListeners(context) {
        const hotkeySettings = {
            ctx: context,
        };
        // __hotkey(
        //   'escape',
        //   (e) => {
        //     this._currentAction = null;
        //   },
        //   hotkeySettings,
        // );
        // __hotkey(
        //   'cmd+s',
        //   (e) => {
        //     this._currentAction = 'saveValues';
        //   },
        //   hotkeySettings,
        // );
    }
    _initEnvironment() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
            this.log(`Init the carpenter environment...`);
            // create the canvas
            const $canvas = document.createElement('div');
            $canvas.classList.add(...this.cls('_canvas'));
            if (this.lnf) {
                $canvas.classList.add('-lnf');
            }
            document.body.appendChild($canvas);
            // create the iframe
            const $iframe = document.createElement('iframe');
            $iframe.classList.add(...this.cls('_iframe'));
            // __iframeAutoSize($iframe, { width: false, height: true });
            this._$iframe = $iframe;
            // append the iframe to the body
            let iframeLoaded = false;
            const iframeLoadedPromise = new Promise((resolve) => {
                $iframe.addEventListener('load', () => {
                    if (iframeLoaded) {
                        return;
                    }
                    iframeLoaded = true;
                    this.dispatch('ready', {
                        bubbles: true,
                        cancelable: false,
                        detail: this,
                    });
                    resolve(true);
                });
            });
            $canvas.appendChild($iframe);
            yield iframeLoadedPromise;
            // update the media queries
            // this._updateMediaQueries();
            const domParser = new DOMParser();
            const doc = domParser.parseFromString(document.documentElement.outerHTML, 'text/html');
            (_a = doc.body.querySelector('s-factory')) === null || _a === void 0 ? void 0 : _a.remove();
            (_b = doc.body.querySelector('s-carpenter')) === null || _b === void 0 ? void 0 : _b.remove();
            (_c = doc.body.querySelector('s-carpenter-daemon')) === null || _c === void 0 ? void 0 : _c.remove();
            (_d = doc.body.querySelector('.s-carpenter_canvas')) === null || _d === void 0 ? void 0 : _d.remove();
            // copy the document into the iframe
            (_e = $iframe === null || $iframe === void 0 ? void 0 : $iframe.contentWindow) === null || _e === void 0 ? void 0 : _e.document.open();
            (_f = $iframe === null || $iframe === void 0 ? void 0 : $iframe.contentWindow) === null || _f === void 0 ? void 0 : _f.document.write(doc.documentElement.outerHTML);
            (_g = $iframe === null || $iframe === void 0 ? void 0 : $iframe.contentWindow) === null || _g === void 0 ? void 0 : _g.document.close();
            // clean the iframe
            (_j = (_h = this.$iframeDocument) === null || _h === void 0 ? void 0 : _h.querySelector(`.${this.cls('_iframe')}`)) === null || _j === void 0 ? void 0 : _j.remove();
            (_l = (_k = this.$iframeDocument) === null || _k === void 0 ? void 0 : _k.querySelector(this.tagName)) === null || _l === void 0 ? void 0 : _l.remove();
            // center the content in the iframe
            const $centerStyle = (_o = (_m = this._$iframe) === null || _m === void 0 ? void 0 : _m.contentDocument) === null || _o === void 0 ? void 0 : _o.createElement('style');
            $centerStyle.innerHTML = `
      body {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `;
            (_p = $iframe.contentWindow) === null || _p === void 0 ? void 0 : _p.document.head.appendChild($centerStyle);
            // if we have some html provided in the component,
            // set it into the iframe
            setTimeout(() => {
                var _a;
                if ((_a = this.component) === null || _a === void 0 ? void 0 : _a.html) {
                    this._setIframeContent(this.component.html);
                }
            }, 100);
            // make sure we don't have any dark mode class
            (_r = (_q = this._$iframe) === null || _q === void 0 ? void 0 : _q.contentDocument) === null || _r === void 0 ? void 0 : _r.body.classList.remove('-dark');
            // register the deamon into the iframe
            __CarpenterDaemonElement.define('s-carpenter-daemon', null, {
            // window: this._$iframe?.contentWindow,
            });
            // empty page
            document
                .querySelectorAll(`body > *:not(${this.tagName}):not(s-factory):not(.${this.cls('_canvas')}):not(script):not(${this.cls('_canvas')
                .map((c) => `.${c}`)
                .join(',')}`)
                .forEach(($el) => {
                $el.remove();
            });
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
    // public selectMediaQuery(name: string): void {
    //   this._currentMediaQuery = name;
    // }
    _applyUpdate(update) {
        return __awaiter(this, void 0, void 0, function* () {
            // do nothing if no component is set
            if (!this.component) {
                return;
            }
            // set the value into the component
            __set(this.component.values, update.path, update.value);
            // create the update object
            const updateObject = Object.assign(Object.assign({}, update), { component: this.component });
            // if an adapter is set, use it to apply the update
            if (typeof this.adapter === 'string' &&
                CarpenterElement._adapters[this.adapter]) {
                CarpenterElement._adapters[this.adapter].applyUpdate(updateObject);
            }
            else if (this.adapter) {
                this.adapter.applyUpdate(updateObject);
            }
            // dispatch an event
            this.dispatch('update', {
                bubbles: true,
                cancelable: false,
                detail: updateObject,
            });
        });
    }
    // private _renderMediaQueries(): any {
    //   return html`<nav class="${this.cls('_media-queries')}">
    //     <ol class="${this.cls('_media-queries-list')}">
    //       ${Object.entries(this.mediaQueries).map(
    //         ([name, query]) => html`
    //           <li
    //             class="${this.cls('_media-queries-list-item')} ${this
    //               ._currentMediaQuery === name
    //               ? '-active'
    //               : ''}"
    //             @pointerup=${() => {
    //               this._currentMediaQuery = name;
    //             }}
    //           >
    //             <span class="${this.cls('_media-queries-list-item-name')}"
    //               >${query.name}</span
    //             >
    //           </li>
    //         `,
    //       )}
    //     </ol>
    //   </nav>`;
    // }
    // private _renderBottombar(): any {
    //   return html`<nav class="${this.cls('_bottombar')}">
    //     ${this._renderMediaQueries()}
    //   </nav>`;
    // }
    // private _renderNotifications(): any {
    //   if (!this._notifications.length) {
    //     return;
    //   }
    //   return html`
    //     <div class="${this.cls('_notifications')}">
    //       <ul class="${this.cls('_notifications-list')}">
    //         ${this._notifications.map(
    //           (notification) => html`
    //             <li
    //               class="${this.cls('_notifications-item')} ${notification.type
    //                 ? `-${notification.type}`
    //                 : ''}"
    //             >
    //               <span class="${this.cls('_notifications-message')}">
    //                 ${notification.message}
    //               </span>
    //             </li>
    //           `,
    //         )}
    //     </div>
    //   `;
    // }
    _renderEditor() {
        var _a;
        if (!this.component) {
            return;
        }
        return html `<div class="${this.cls('_editor')}">
      <div class="${this.cls('_editor-inner')}">
        <s-json-schema-form
          id="s-carpenter-json-schema-form"
          .lnf=${this.lnf}
          @s-json-schema-form.update=${(e) => {
            this._applyUpdate(Object.assign({}, e.detail.update));
        }}
          id="s-carpenter-json-schema-form"
          name="s-carpenter-json-schema-form"
          .buttonClasses=${true}
          .formClasses=${true}
          .verbose=${this.verbose}
          .schema=${this.component.schema}
          .values=${(_a = this.component.values) !== null && _a !== void 0 ? _a : {}}
        ></s-json-schema-form>
      </div>
    </div>`;
    }
    render() {
        return html `
      <s-carpenter-daemon .lnf=${this.lnf}></s-carpenter-daemon>
      ${this._renderEditor()}
    `;
    }
}
CarpenterElement._adapters = {};
export default CarpenterElement;
__decorate([
    property({ type: Object })
], CarpenterElement.prototype, "mediaQueries", void 0);
__decorate([
    property({ type: String })
], CarpenterElement.prototype, "mediaQuery", void 0);
__decorate([
    property({ type: Object })
], CarpenterElement.prototype, "adapter", void 0);
__decorate([
    property({ type: Object })
], CarpenterElement.prototype, "component", void 0);
__decorate([
    property({ type: String })
], CarpenterElement.prototype, "darkModeClass", void 0);
__decorate([
    property({ type: Function })
], CarpenterElement.prototype, "loaded", void 0);
__decorate([
    state()
], CarpenterElement.prototype, "_notifications", void 0);
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
__IconElement.define('s-icon', {
    type: 'solid',
});
//# sourceMappingURL=carpenter.element.js.map