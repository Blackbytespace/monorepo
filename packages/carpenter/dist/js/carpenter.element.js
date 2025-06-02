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
import { __copyText } from '@lotsof/sugar/clipboard';
import { __injectHtml } from '@lotsof/sugar/dom';
import { __isInIframe } from '@lotsof/sugar/is';
import { __escapeQueue } from '@lotsof/sugar/keyboard';
import { __clone, __set } from '@lotsof/sugar/object';
import { html } from 'lit';
import { property, state } from 'lit/decorators.js';
import '../../src/css/output/carpenter.build.css';
import __CarpenterDaemonElement from './carpenterDaemon.element.js';
class CarpenterElement extends __LitElement {
    constructor() {
        super('s-carpenter');
        this.mediaQueries = {};
        this.mediaQuery = 'desktop';
        this.preselectedComponent = null;
        this.darkModeClass = '-dark';
        this.uiMode = 'light';
        this.appendToBody = true;
        this._notifications = [];
        this._currentMediaQuery = '';
        this._currentAction = null;
        this._state = {};
        this._components = {};
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
        var _a, _b, _c, _d, _e;
        super.update(changedProperties);
        // update the daemon accordingly
        (_a = this._$daemon) === null || _a === void 0 ? void 0 : _a.requestUpdate();
        // get the json schema form
        if (!this._$jsonSchemaForm) {
            this._$jsonSchemaForm = this.querySelector('s-json-schema-form');
        }
        // update the media query
        if (changedProperties.has('_currentMediaQuery')) {
            if (((_b = this.currentMediaQuery) === null || _b === void 0 ? void 0 : _b.max) !== -1) {
                (_c = this._$canvas) === null || _c === void 0 ? void 0 : _c.style.setProperty('--s-carpenter-canvas-width', ((_d = this.currentMediaQuery) === null || _d === void 0 ? void 0 : _d.max) + 'px');
            }
            else {
                (_e = this._$canvas) === null || _e === void 0 ? void 0 : _e.style.removeProperty('--s-carpenter-canvas-width');
            }
            setTimeout(() => {
                this._updateIframeSize();
            }, 300);
        }
        if (this._$jsonSchemaForm) {
            // @TODO       find a better way to update the form without using setTimeout
            setTimeout(() => {
                // @ts-ignore
                this._$jsonSchemaForm.requestUpdate();
            });
        }
        if (changedProperties.has('selectedComponent')) {
            setTimeout(() => {
                this.requestUpdate();
            });
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
        var _a;
        // wait for the iframe to load
        (_a = this._$iframe) === null || _a === void 0 ? void 0 : _a.addEventListener('load', () => {
            var _a, _b;
            // get the daemon reference
            const $daemon = this.querySelector('s-carpenter-daemon');
            (_b = (_a = this._$iframe) === null || _a === void 0 ? void 0 : _a.contentDocument) === null || _b === void 0 ? void 0 : _b.body.appendChild($daemon);
            this._$daemon = $daemon;
            // init the daemon listeners
            this._initDaemonListeners();
        });
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
        var _a, _b;
        // listen for edit event from the daemon
        // @ts-ignore
        (_a = this._$daemon) === null || _a === void 0 ? void 0 : _a.addEventListener('s-carpenter-daemon.select', (e) => {
            this.dispatch('select', {
                bubbles: true,
                detail: e.detail,
            });
        });
        (_b = this._$daemon) === null || _b === void 0 ? void 0 : _b.addEventListener('s-carpenter-daemon.preselect', (e) => {
            this.dispatch('preselect', {
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
            // if wanted, append the carpenter element to the body
            const $carpenter = document.querySelector(this.tagName);
            if (this.appendToBody && $carpenter) {
                this.log(`Appending the carpenter element to the body, as "appendToBody" is set to true`);
                document.body.appendChild($carpenter);
            }
            // create the iframe
            const $iframe = document.createElement('iframe');
            $iframe.classList.add(...this.cls('_iframe'));
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
            (_c = doc.body.querySelector('s-carpenter-cms')) === null || _c === void 0 ? void 0 : _c.remove();
            (_d = doc.body.querySelector('s-carpenter-daemon')) === null || _d === void 0 ? void 0 : _d.remove();
            (_e = doc.body.querySelector('.s-carpenter_canvas')) === null || _e === void 0 ? void 0 : _e.remove();
            // copy the document into the iframe
            (_f = $iframe === null || $iframe === void 0 ? void 0 : $iframe.contentWindow) === null || _f === void 0 ? void 0 : _f.document.open();
            (_g = $iframe === null || $iframe === void 0 ? void 0 : $iframe.contentWindow) === null || _g === void 0 ? void 0 : _g.document.write(doc.documentElement.outerHTML);
            (_h = $iframe === null || $iframe === void 0 ? void 0 : $iframe.contentWindow) === null || _h === void 0 ? void 0 : _h.document.close();
            // clean the iframe
            (_k = (_j = this.$iframeDocument) === null || _j === void 0 ? void 0 : _j.querySelector(`.${this.cls('_iframe')}`)) === null || _k === void 0 ? void 0 : _k.remove();
            (_m = (_l = this.$iframeDocument) === null || _l === void 0 ? void 0 : _l.querySelector(this.tagName)) === null || _m === void 0 ? void 0 : _m.remove();
            // center the content in the iframe
            const $centerStyle = (_p = (_o = this._$iframe) === null || _o === void 0 ? void 0 : _o.contentDocument) === null || _p === void 0 ? void 0 : _p.createElement('style');
            $centerStyle.innerHTML = `
      body {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        justify-content: center;
        align-items: center;
      }
    `;
            (_q = $iframe.contentWindow) === null || _q === void 0 ? void 0 : _q.document.head.appendChild($centerStyle);
            (_r = this.$iframe) === null || _r === void 0 ? void 0 : _r.addEventListener('load', () => {
                var _a, _b, _c;
                // if the component has some html,
                // set it into the iframe
                if ((_a = this.selectedComponent) === null || _a === void 0 ? void 0 : _a.html) {
                    this._setIframeContent(this.selectedComponent.html);
                }
                // make sure we don't have any dark mode class
                (_c = (_b = this._$iframe) === null || _b === void 0 ? void 0 : _b.contentDocument) === null || _c === void 0 ? void 0 : _c.body.classList.remove('-dark');
            });
            // register the deamon into the iframe
            __CarpenterDaemonElement.define('s-carpenter-daemon');
            // empty page
            document
                .querySelectorAll(`body > *:not(${this.tagName}):not(s-factory):not(.s-carpenter):not(.s-carpenter-cms):not(.${this.cls('_canvas')}):not(script):not(${this.cls('_canvas')
                .map((c) => `.${c}`)
                .join(',')}`)
                .forEach(($el) => {
                $el.remove();
            });
        });
    }
    _setSelectedComponent(component) {
        // set the selected component
        this.selectedComponent = component !== null && component !== void 0 ? component : undefined;
        // add an action in the escape queue
        __escapeQueue(() => {
            this.selectedComponent = undefined;
        }, {
            ctx: [document, this.$iframeDocument],
        });
        // dispatch the select event
        this.dispatch('select', {
            bubbles: true,
            detail: component,
        });
    }
    _setPreselectedComponent(component) {
        // set the preselected component
        this.preselectedComponent = component !== null && component !== void 0 ? component : undefined;
        // dispatch the preselect event
        this.dispatch('preselect', {
            bubbles: true,
            detail: component,
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
    _applyUpdate(update) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            // do nothing if no component is set
            if (!this.selectedComponent) {
                return;
            }
            // set the value into the component
            __set(this.selectedComponent.values, update.path, update.value);
            __set(this._components[this.selectedComponent.id].values, update.path, update.value);
            // create the update object
            const updateObject = Object.assign(Object.assign({}, update), { component: __clone(this.selectedComponent) });
            // if an adapter is set, use it to apply the update
            if (typeof this.adapter === 'string' &&
                CarpenterElement._adapters[this.adapter]) {
                yield CarpenterElement._adapters[this.adapter].applyUpdate(updateObject);
            }
            else if (this.adapter) {
                yield this.adapter.applyUpdate(updateObject);
            }
            // dispatch an event
            this.dispatch('update', {
                bubbles: true,
                cancelable: false,
                detail: updateObject,
            });
            // set the internal name of the component
            // if exists and is not set
            if (this._components[this.selectedComponent.id]) {
                if ((_a = this._components[this.selectedComponent.id].values) === null || _a === void 0 ? void 0 : _a.internalName) {
                    this._components[this.selectedComponent.id].internalName =
                        this._components[this.selectedComponent.id].values.internalName;
                }
            }
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
        if (!this.selectedComponent) {
            return html ``;
        }
        return html `<div class="${this.cls('_editor')}">
      <div class="${this.cls('_editor-inner')}">
        <header class=${this.cls('_header')}>
          <div class="${this.cls('_header-metas')}">
            <h2 class=${this.cls('_header-title')}>
              <s-icon
                class="${this.cls('_header-icon')}"
                name="${this.selectedComponent.icon}"
              ></s-icon>
              ${this.selectedComponent.schema.title}
            </h2>
            ${((_a = this.selectedComponent.values) === null || _a === void 0 ? void 0 : _a.id)
            ? html `<span
                  class="${this.cls('_header-title-id')} button -outline"
                  @click=${() => {
                var _a;
                __copyText((_a = this.selectedComponent) === null || _a === void 0 ? void 0 : _a.values.id);
            }}
                  >ID: #${this.selectedComponent.values.id}
                  <s-icon name="clipboard-document-list"
                /></span>`
            : ''}
          </div>
          <p class=${this.cls('_header-description')}>
            ${this.selectedComponent.schema.description}
          </p>
        </header>

        <s-json-schema-form
          id="s-carpenter-json-schema-form"
          name="s-carpenter-json-schema-form"
          .lnf=${this.lnf}
          .buttonClasses=${true}
          .formClasses=${true}
          .header=${false}
          .verbose=${this.verbose}
          .schema=${__clone(this.selectedComponent.schema)}
          .values=${__clone(this.selectedComponent.values)}
          @s-json-schema-form.update=${(e) => {
            this._applyUpdate(e.detail.update);
        }}
        ></s-json-schema-form>
      </div>
    </div>`;
    }
    _renderTree() {
        return html `<nav class="${this.cls('_tree')}">
      <header class=${this.cls('_header')}>
        <h2 class=${this.cls('_header-title')}>Inspector</h2>
      </header>

      <ol class="${this.cls('_tree-list')}">
        ${Object.entries(this._components).map(([id, component]) => {
            var _a;
            console.log('com', component);
            return html `
            <li
              class="${this.cls('_tree-item')}"
              @mouseenter=${() => {
                this._setPreselectedComponent(component);
            }}
            >
              <button
                class="${this.cls('_tree-item-button')}"
                @click=${() => {
                this._setSelectedComponent(component);
            }}
              >
                <s-icon name="${component.icon}"></s-icon>
                <span class="${this.cls('_tree-item-name')}">
                  ${component.internalName}
                </span>
                ${((_a = component.values) === null || _a === void 0 ? void 0 : _a.id)
                ? html `
                      <span
                        class="${this.cls('_tree-item-id')}"
                        @click=${(e) => {
                    var _a;
                    e.stopPropagation();
                    __copyText((_a = component.values.id) !== null && _a !== void 0 ? _a : '');
                }}
                        >#${component.values.id}
                        <s-icon name="clipboard-document-list"></s-icon>
                      </span>
                    `
                : ''}
              </button>
            </li>
          `;
        })}
      </ol>
    </nav>`;
    }
    render() {
        return html `
      <s-carpenter-daemon
        .uiMode=${this.uiMode}
        .lnf=${this.lnf}
        .selectedComponent=${this.selectedComponent}
        .preselectedComponent=${this.preselectedComponent}
        .scrollOnSelect=${true}
        .scrollOnPreselect=${true}
        @s-carpenter-daemon.component.connect=${(e) => {
            // add the component to the list
            this._components[e.detail.id] = e.detail;
            // forward the event to the parent
            this.dispatch('component.connect', {
                bubbles: true,
                detail: e.detail,
            });
        }}
        @s-carpenter-daemon.component.disconnect=${(e) => {
            // remove the component from the list
            delete this._components[e.detail.id];
            // forward the event to the parent
            this.dispatch('component.disconnect', {
                bubbles: true,
                detail: e.detail,
            });
        }}
        @s-carpenter-daemon.preselect=${(e) => {
            this._setPreselectedComponent(e.detail);
        }}
        @s-carpenter-daemon.select=${(e) => {
            this._setSelectedComponent(e.detail);
        }}
        @s-carpenter-daemon.edit=${(e) => {
            this.dispatch('edit', {
                bubbles: true,
                detail: e.detail,
            });
        }}
      ></s-carpenter-daemon>
      ${this.selectedComponent ? this._renderEditor() : this._renderTree()}
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
], CarpenterElement.prototype, "selectedComponent", void 0);
__decorate([
    property({ type: Object })
], CarpenterElement.prototype, "preselectedComponent", void 0);
__decorate([
    property({ type: String })
], CarpenterElement.prototype, "darkModeClass", void 0);
__decorate([
    property({ type: Function })
], CarpenterElement.prototype, "loaded", void 0);
__decorate([
    property({ type: String })
], CarpenterElement.prototype, "uiMode", void 0);
__decorate([
    property({ type: Boolean })
], CarpenterElement.prototype, "appendToBody", void 0);
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