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
import { __whenEventListener } from '@lotsof/sugar/dom';
import { __isInIframe } from '@lotsof/sugar/is';
import { __escapeQueue } from '@lotsof/sugar/keyboard';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import '../../src/css/output/carpenter.build.css';
import __CarpenterVueProxy from '../../src/proxies/carpenterVueProxy.vue';
import { __Carpenter, __CarpenterDaemonElement } from './_exports.js';
// save the carpenter vue proxy to access globally
// @ts-ignore
window.__CarpenterVueProxy = __CarpenterVueProxy;
class CarpenterElement extends __LitElement {
    constructor() {
        super('s-carpenter');
        this.preselectedComponent = null;
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
        var _a;
        super.update(changedProperties);
        // update the daemon accordingly
        (_a = this._$daemon) === null || _a === void 0 ? void 0 : _a.requestUpdate();
        if (changedProperties.has('selectedComponent')) {
            setTimeout(() => {
                this.requestUpdate();
            });
        }
    }
    firstUpdated(_changedProperties) {
        var _a, _b;
        // get the daemon reference
        const $daemon = this.querySelector('s-carpenter-daemon');
        (_b = (_a = __Carpenter.$iframe) === null || _a === void 0 ? void 0 : _a.contentDocument) === null || _b === void 0 ? void 0 : _b.body.appendChild($daemon);
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
            __Carpenter.$iframe = $iframe;
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
                const $centerStyle = (_b = (_a = __Carpenter.$iframe) === null || _a === void 0 ? void 0 : _a.contentDocument) === null || _b === void 0 ? void 0 : _b.createElement('style');
                $centerStyle.innerHTML = `
      body {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        justify-content: center;
        align-items: center;
      }
    `;
                (_d = (_c = __Carpenter.$iframe) === null || _c === void 0 ? void 0 : _c.contentWindow) === null || _d === void 0 ? void 0 : _d.document.head.appendChild($centerStyle);
            }
            // register the deamon into the iframe
            __CarpenterDaemonElement.define('s-carpenter-daemon');
            // init the listeners like escape key, etc...
            this._initListeners(document);
            this._initListeners(__Carpenter.$iframe.contentDocument);
            // dispatch the ready event
            __Carpenter.dispatchEvent('ready', {});
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
        // @ts-ignore
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
    _setSelectedComponent(component) {
        var _a, _b, _c, _d, _e, _f, _g;
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
            ctx: [document, (_g = __Carpenter.$iframe) === null || _g === void 0 ? void 0 : _g.contentDocument],
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
    `;
    }
}
CarpenterElement._adapters = {};
export default CarpenterElement;
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
CarpenterElement.define('s-carpenter');
__IconElement.define('s-icon', {
    type: 'solid',
});
//# sourceMappingURL=carpenter.element.js.map