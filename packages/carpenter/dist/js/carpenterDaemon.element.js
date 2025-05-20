var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import __LitElement from '@lotsof/lit-element';
import { __injectStyle, __querySelectorLive } from '@lotsof/sugar/dom';
import { html } from 'lit';
// @ts-ignore
import { __copyText } from '@lotsof/sugar/clipboard';
import { __isDarkMode } from '@lotsof/sugar/is';
import { property } from 'lit/decorators.js';
import __css from '../../src/css/carpenterDaemon.css?raw';
export default class CarpenterDaemonElement extends __LitElement {
    constructor() {
        super('s-carpenter-daemon');
        this.uiMode = 'light';
        this.selectedComponent = null;
        this.preselectedComponent = null;
        this.$selectedComponent = null;
        this.$preselectedComponent = null;
    }
    get $document() {
        return this.ownerDocument;
    }
    get $window() {
        // @ts-ignore
        return this.$document.defaultView || this.$document.parentWindow;
    }
    get component() {
        var _a;
        return (_a = this.preselectedComponent) !== null && _a !== void 0 ? _a : this.selectedComponent;
    }
    get $component() {
        var _a;
        return (_a = this.$preselectedComponent) !== null && _a !== void 0 ? _a : this.$selectedComponent;
    }
    update(changedProperties) {
        super.update(changedProperties);
        // update the daemon position
        setTimeout(() => {
            this._updateDaemonPosition();
        }, 100);
    }
    firstUpdated(_changedProperties) {
        // set the daemon ui mode depending on
        // the mode of the website
        if (__isDarkMode({
            rootNode: this,
        })) {
            this.classList.add('-light');
            this.classList.remove('-dark');
        }
        else {
            this.classList.add('-dark');
            this.classList.remove('-light');
        }
    }
    getComponentJson($component) {
        var _a, _b, _c;
        const componentJson = JSON.parse((_c = (_b = (_a = $component
            .querySelector(`#${$component.getAttribute('id')}-data`)) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()) !== null && _c !== void 0 ? _c : '{}');
        return componentJson;
    }
    adoptedCallback() {
        // inject the stylesheet
        __injectStyle(__css, {
            id: 's-carpenter-daemon-css',
            rootNode: this.$document.head,
        });
        // query live for all the components
        __querySelectorLive('[type="carpenter/component"]', ($component) => {
            this._initComponent($component);
        }, {
            disconnectedCallback: ($component) => {
                this._deleteComponent($component);
            },
            rootNode: this.$document,
        });
        // update the position of the daemon on resize
        this.$window.addEventListener('resize', () => {
            this._updateDaemonPosition();
        });
    }
    _initComponent($component) {
        // get the component json from the dom component
        const componentJson = this.getComponentJson($component);
        // dispatch an event to notify carpenter that a new component is available
        this.dispatch('component.connect', {
            bubbles: true,
            detail: componentJson,
        });
        // when mouseenter, trigger the preselect event
        $component.addEventListener('mouseenter', () => {
            this._preselect($component);
        });
    }
    _preselect($component) {
        if (this.$preselectedComponent &&
            this.$preselectedComponent === $component) {
            return;
        }
        this.$preselectedComponent = $component;
        this.preselectedComponent = this.getComponentJson($component);
        this.dispatch('preselect', {
            bubbles: true,
            detail: this.preselectedComponent,
        });
        this._updateDaemonPosition();
        this.requestUpdate();
    }
    _select($component) {
        if (this.$selectedComponent && this.$selectedComponent === $component) {
            return;
        }
        this.selectedComponent = this.getComponentJson($component);
        this.dispatch('select', {
            bubbles: true,
            detail: this.selectedComponent,
        });
        this._updateDaemonPosition();
    }
    _edit($component) {
        this.dispatch('edit', {
            bubbles: true,
            detail: this.getComponentJson($component),
        });
    }
    _deleteComponent($component) {
        this.dispatch('component.disconnect', {
            bubbles: true,
            detail: {
                id: $component.getAttribute('id'),
            },
        });
    }
    _updateDaemonPosition() {
        var _a, _b, _c, _d;
        const top = (_a = this.$component) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().top;
        const left = (_b = this.$component) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect().left;
        const width = (_c = this.$component) === null || _c === void 0 ? void 0 : _c.getBoundingClientRect().width;
        const height = (_d = this.$component) === null || _d === void 0 ? void 0 : _d.getBoundingClientRect().height;
        this.style.top = `${top}px`;
        this.style.left = `${left}px`;
        this.style.width = `${width}px`;
        this.style.height = `${height}px`;
    }
    render() {
        var _a, _b, _c, _d, _e;
        return html `<div
      class="${this.cls('_inner')}"
      @dblclick=${() => {
            if (!this.$preselectedComponent) {
                return;
            }
            this._select(this.$preselectedComponent);
            this._edit(this.$preselectedComponent);
        }}
    >
      <div class="${this.cls('_header')}">
        <span class="${this.cls('_title')}">${(_a = this.component) === null || _a === void 0 ? void 0 : _a.name}</span>
        ${((_c = (_b = this.component) === null || _b === void 0 ? void 0 : _b.values) === null || _c === void 0 ? void 0 : _c.id)
            ? html `
              <button
                class="${this.cls('_id')}"
                @click=${() => {
                var _a, _b, _c;
                __copyText((_c = (_b = (_a = this.component) === null || _a === void 0 ? void 0 : _a.values) === null || _b === void 0 ? void 0 : _b.id) !== null && _c !== void 0 ? _c : '');
            }}
              >
                ${(_e = (_d = this.component) === null || _d === void 0 ? void 0 : _d.values) === null || _e === void 0 ? void 0 : _e.id}
                <s-icon type="outline" name="clipboard-document-list" />
              </button>
            `
            : ''}
      </div>
      <div class="${this.cls('_tools')}">
        <div class="${this.cls('_tool')}">
          <span
            class="${this.cls('_tool-label')}"
            @click=${() => {
            if (!this.$preselectedComponent) {
                return;
            }
            this._select(this.$preselectedComponent);
            this._edit(this.$preselectedComponent);
        }}
            >Edit</span
          >
          <s-icon type="solid" name="pencil"></s-icon>
        </div>
      </div>
    </div> `;
    }
}
__decorate([
    property({ type: String })
], CarpenterDaemonElement.prototype, "uiMode", void 0);
//# sourceMappingURL=carpenterDaemon.element.js.map