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
import { __whenEventListener } from '@lotsof/sugar/dom';
import { __isInIframe } from '@lotsof/sugar/is';
import { __escapeQueue } from '@lotsof/sugar/keyboard';
import { __clone, __set } from '@lotsof/sugar/object';
import { html } from 'lit';
import { property, state } from 'lit/decorators.js';
import '../../src/css/output/carpenter.build.css';
import __CarpenterVueProxy from '../../src/proxies/carpenterVueProxy.vue';
import __CarpenterDaemonElement from './carpenterDaemon.element.js';
import __CarpenterRegistry from './carpenterRegistry.js';
// save the carpenter vue proxy to access globally
// @ts-ignore
window.__CarpenterVueProxy = __CarpenterVueProxy;
class CarpenterElement extends __LitElement {
    constructor() {
        super('s-carpenter');
        this.mediaQueries = {};
        this.mediaQuery = 'desktop';
        this.preselectedComponent = null;
        this.darkModeClass = '-dark';
        this.uiMode = 'light';
        this.appendToBody = true;
        this.addInternalName = false;
        this.centerContent = false;
        this.advancedGroup = {
            id: 'advanced',
            title: 'Advanced',
            type: 'stack',
            description: 'Advanced options for the component',
            icon: 'cog',
            buttonText: 'Open advanced options',
        };
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
        var _a, _b;
        // get the daemon reference
        const $daemon = this.querySelector('s-carpenter-daemon');
        (_b = (_a = this._$iframe) === null || _a === void 0 ? void 0 : _a.contentDocument) === null || _b === void 0 ? void 0 : _b.body.appendChild($daemon);
        this._$daemon = $daemon;
        // init the daemon listeners
        this._initDaemonListeners();
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            // if not in an iframe, init the environment
            // by creating an iframe and load the factory deamon
            // inside it
            if (__isInIframe()) {
                return;
            }
            // create the canvas
            const $canvas = document.createElement('div');
            $canvas.classList.add(...this.cls('_canvas'));
            if (this.lnf) {
                $canvas.classList.add('-lnf');
            }
            document.body.appendChild($canvas);
            // create the iframe
            const $iframe = document.createElement('iframe');
            $iframe.src = document.location.href;
            $iframe.classList.add(...this.cls('_iframe'));
            this._$iframe = $iframe;
            // add the iframe to the canvas
            $canvas.appendChild($iframe);
            // wait the iframe to be loaded
            yield __whenEventListener('load', $iframe);
            // if wanted, append the carpenter element to the body
            const $carpenter = document.querySelector(this.tagName);
            if (this.appendToBody && $carpenter) {
                this.log(`Appending the carpenter element to the body, as "appendToBody" is set to true`);
                document.body.appendChild($carpenter);
            }
            // center the content if wanted
            if (this.centerContent) {
                // center the content in the iframe
                const $centerStyle = (_b = (_a = this.$iframe) === null || _a === void 0 ? void 0 : _a.contentDocument) === null || _b === void 0 ? void 0 : _b.createElement('style');
                $centerStyle.innerHTML = `
      body {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        justify-content: center;
        align-items: center;
      }
    `;
                (_d = (_c = this.$iframe) === null || _c === void 0 ? void 0 : _c.contentWindow) === null || _d === void 0 ? void 0 : _d.document.head.appendChild($centerStyle);
            }
            // register the deamon into the iframe
            __CarpenterDaemonElement.define('s-carpenter-daemon');
            // empty page
            // document
            //   .querySelectorAll(
            //     `body > *:not(${
            //       this.tagName
            //     }):not(s-factory):not(.s-carpenter):not(.s-carpenter):not(.${this.cls(
            //       '_canvas',
            //     )}):not(script):not(${this.cls('_canvas')
            //       .map((c) => `.${c}`)
            //       .join(',')}`,
            //   )
            //   .forEach(($el) => {
            //     $el.remove();
            //   });
            // init the listeners like escape key, etc...
            this._initListeners(document);
            this._initListeners(this.$iframeDocument);
            // dispatch the ready event
            this.dispatch('ready', {
                bubbles: true,
                cancelable: false,
                detail: this,
            });
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
            this.log(`Init the carpenter environment...`);
            // // append the iframe to the body
            // let iframeLoaded = false;
            // const iframeLoadedPromise = new Promise((resolve) => {
            //   $iframe.addEventListener('load', () => {
            //     if (iframeLoaded) {
            //       return;
            //     }
            //     iframeLoaded = true;
            //     this.dispatch('ready', {
            //       bubbles: true,
            //       cancelable: false,
            //       detail: this,
            //     });
            //     resolve(true);
            //   });
            // });
            // await iframeLoadedPromise;
            // update the media queries
            // this._updateMediaQueries();
            // const domParser = new DOMParser();
            // const doc = domParser.parseFromString(
            //   document.documentElement.outerHTML,
            //   'text/html',
            // );
            // doc.body.querySelector('s-factory')?.remove();
            // doc.body.querySelector('s-carpenter')?.remove();
            // doc.body.querySelector('s-carpenter')?.remove();
            // doc.body.querySelector('s-carpenter-daemon')?.remove();
            // doc.body.querySelector('.s-carpenter_canvas')?.remove();
            // copy the document into the iframe
            // $iframe.contentWindow?.document.open();
            // $iframe.contentWindow?.document.write(`
            //   <!DOCTYPE html>
            //   ${doc.documentElement.outerHTML}
            // `);
            // $iframe?.contentWindow?.document.close();
            // clean the iframe
            // this.$iframeDocument?.querySelector(`.${this.cls('_iframe')}`)?.remove();
            // this.$iframeDocument?.querySelector(this.tagName)?.remove();
            //   // make sure we don't have any dark mode class
            //   // this._$iframe?.contentDocument?.body.classList.remove('-dark');
            // });
        });
    }
    _setSelectedComponent(component) {
        var _a, _b, _c, _d, _e, _f;
        // set the selected component
        this.selectedComponent = component !== null && component !== void 0 ? component : undefined;
        // add the "internalName" field into the component schema
        if (this.addInternalName &&
            this.selectedComponent &&
            !((_b = (_a = this.selectedComponent.schema) === null || _a === void 0 ? void 0 : _a.properties) === null || _b === void 0 ? void 0 : _b.internalName)) {
            if (!((_c = this.selectedComponent.schema) === null || _c === void 0 ? void 0 : _c.properties)) {
                this.selectedComponent.schema.properties = {};
            }
            this.selectedComponent.schema.properties.internalName = {
                type: 'string',
                title: 'Internal name',
                description: 'The internal name of the component',
                editor: {
                    group: this.advancedGroup.id,
                },
            };
            if (!((_e = (_d = this.selectedComponent.schema.editor) === null || _d === void 0 ? void 0 : _d.groups) === null || _e === void 0 ? void 0 : _e.find((group) => group.id === this.advancedGroup.id))) {
                if (!((_f = this.selectedComponent.schema) === null || _f === void 0 ? void 0 : _f.editor)) {
                    this.selectedComponent.schema.editor = {};
                }
                if (!this.selectedComponent.schema.editor.groups) {
                    this.selectedComponent.schema.editor.groups = [];
                }
                this.selectedComponent.schema.editor.groups.push(this.advancedGroup);
            }
        }
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
    _updateIframeSize() {
        var _a;
        (_a = this._$iframe) === null || _a === void 0 ? void 0 : _a.dispatchEvent(new CustomEvent('load', {
            bubbles: true,
            cancelable: false,
        }));
    }
    _applyUpdate(update) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            // do nothing if no component is set
            if (!this.selectedComponent) {
                return;
            }
            // set the value into the component
            __set(this.selectedComponent.values, update.path, update.value);
            __set((_b = (_a = __CarpenterRegistry.getComponent(this.selectedComponent.$component)) === null || _a === void 0 ? void 0 : _a.values) !== null && _b !== void 0 ? _b : {}, update.path, update.value);
            // __set(
            //   this._components[this.selectedComponent.id].values,
            //   update.path,
            //   update.value,
            // );
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
              ${this.selectedComponent.icon
            ? html `
                    <s-icon
                      class="${this.cls('_header-icon')}"
                      name="${this.selectedComponent.icon}"
                    ></s-icon>
                  `
            : ''}
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
        var _a;
        return html `<nav class="${this.cls('_tree')}">
      <header class=${this.cls('_header')}>
        <h2 class=${this.cls('_header-title')}>Inspector</h2>
      </header>

      <ol class="${this.cls('_tree-list')}">
        ${Object.entries((_a = __CarpenterRegistry.components) !== null && _a !== void 0 ? _a : {}).map(([id, component]) => {
            var _a, _b;
            // if the component is not visible, skip it
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
                    ${(_a = component.values.internalName) !== null && _a !== void 0 ? _a : component.name}
                  </span>
                  ${((_b = component.values) === null || _b === void 0 ? void 0 : _b.id)
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
            // this._components[e.detail.id] = e.detail;
            // forward the event to the parent
            this.dispatch('component.connect', {
                bubbles: true,
                detail: e.detail,
            });
        }}
        @s-carpenter-daemon.component.disconnect=${(e) => {
            // do nothing if no component is set
            // remove the component from the list
            // delete this._components[e.detail.id];
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
    property({ type: Boolean })
], CarpenterElement.prototype, "addInternalName", void 0);
__decorate([
    property({ type: Boolean })
], CarpenterElement.prototype, "centerContent", void 0);
__decorate([
    property({ type: Object })
], CarpenterElement.prototype, "advancedGroup", void 0);
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