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
import { __isInIframe } from '@lotsof/sugar/is';
import { __clone } from '@lotsof/sugar/object';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import '../../src/css/output/carpenter.build.css';
import __Carpenter from './carpenter.js';
export default class CarpenterEditorElement extends __LitElement {
    constructor() {
        super('s-carpenter-editor');
        this.lnf = false;
        this.addInternalName = false;
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
    get selectedComponent() {
        return __Carpenter.selectedComponent;
    }
    get preselectedComponent() {
        return __Carpenter.preselectedComponent;
    }
    update(changedProperties) {
        super.update(changedProperties);
        // get the json schema form
        if (!this._$jsonSchemaForm) {
            this._$jsonSchemaForm = this.querySelector('s-json-schema-form');
        }
        if (this._$jsonSchemaForm) {
            // @TODO       find a better way to update the form without using setTimeout
            setTimeout(() => {
                // @ts-ignore
                this._$jsonSchemaForm.requestUpdate();
            });
        }
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            // if not in an iframe, init the environment
            // by creating an iframe and load the factory deamon
            // inside it
            if (__isInIframe()) {
                return;
            }
            // request update when something changes
            // in the carpenter "store"
            __Carpenter.addEventListener('update', (e) => {
                this.requestUpdate();
            });
            // init the listeners like escape key, etc...
            this._initListeners(document);
            // dispatch the ready event
            this.dispatch('ready', {
                bubbles: true,
                cancelable: false,
                detail: this,
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
    _renderEditor() {
        var _a;
        if (!this.selectedComponent) {
            return;
        }
        return html `<div
      class="${`${this.cls('_editor')} ${this.lnf ? '-lnf' : ''}`}"
    >
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
            if (!this.selectedComponent) {
                return;
            }
            console.log('Apply update', e.detail.update);
            __Carpenter.applyUpdate(this.selectedComponent, e.detail.update);
            // this._applyUpdate(e.detail.update);
        }}
        ></s-json-schema-form>
      </div>
    </div>`;
    }
    _renderTree() {
        var _a;
        console.log('tree', __Carpenter.components);
        return html `<nav class="${this.cls('_tree')}">
      <header class=${this.cls('_header')}>
        <h2 class=${this.cls('_header-title')}>Inspector</h2>
      </header>

      <ol class="${this.cls('_tree-list')}">
        ${Object.entries((_a = __Carpenter.components) !== null && _a !== void 0 ? _a : {}).map(([id, component]) => {
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
      ${__Carpenter.selectedComponent
            ? this._renderEditor()
            : this._renderTree()}
    `;
    }
}
__decorate([
    property({ type: Boolean })
], CarpenterEditorElement.prototype, "lnf", void 0);
__decorate([
    property({ type: Boolean })
], CarpenterEditorElement.prototype, "addInternalName", void 0);
__decorate([
    property({ type: Object })
], CarpenterEditorElement.prototype, "advancedGroup", void 0);
CarpenterEditorElement.define('s-carpenter-editor');
__IconElement.define('s-icon', {
    type: 'solid',
});
//# sourceMappingURL=carpenterEditor.element.js.map