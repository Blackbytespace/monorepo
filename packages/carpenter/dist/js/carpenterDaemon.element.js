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
import { property } from 'lit/decorators.js';
import __css from '../../src/css/carpenterDaemon.css?raw';
export default class CarpenterDaemonElement extends __LitElement {
    constructor() {
        super('s-carpenter-daemon');
        this.selectedComponent = null;
        this.preselectedComponent = null;
        this.$currentComponent = null;
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
            this._setDaemonPosition();
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
        // move the daemon on the component
        $component.addEventListener('mousemove', () => {
            this._setComponent($component);
        });
        // when doubleclick, trigger the select event
        $component.addEventListener('dblclick', () => {
            this._select($component);
            this._edit($component);
        });
        // when mouseenter, trigger the preselect event
        $component.addEventListener('mouseenter', () => {
            this._preselect($component);
        });
    }
    _preselect($component) {
        this.dispatch('preselect', {
            bubbles: true,
            detail: this.getComponentJson($component),
        });
    }
    _select($component) {
        this.dispatch('select', {
            bubbles: true,
            detail: this.getComponentJson($component),
        });
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
    _setComponent($component) {
        // do nothing if the component is already set
        if (this.$currentComponent === $component) {
            return;
        }
        // set the current component
        this.$currentComponent = $component;
        // update the position of the daemon
        this._setDaemonPosition();
    }
    _setDaemonPosition() {
        var _a, _b, _c, _d;
        const top = (_a = this.$currentComponent) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().top;
        const left = (_b = this.$currentComponent) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect().left;
        const width = (_c = this.$currentComponent) === null || _c === void 0 ? void 0 : _c.getBoundingClientRect().width;
        const height = (_d = this.$currentComponent) === null || _d === void 0 ? void 0 : _d.getBoundingClientRect().height;
        this.style.top = `${top}px`;
        this.style.left = `${left}px`;
        this.style.width = `${width}px`;
        this.style.height = `${height}px`;
    }
    render() {
        var _a;
        return html `<div class="${this.cls('_inner')}">
      <div class="${this.cls('_header')}">
        <div class="${this.cls('_title')}">${(_a = this.selectedComponent) === null || _a === void 0 ? void 0 : _a.name}</div>
      </div>
      <div class="${this.cls('_tools')}">
        <div
          class="${this.cls('_tool')}"
          @click=${() => {
            console.log('efit');
        }}
        >
          <span
            class="${this.cls('_tool-label')}"
            @click=${() => {
            if (!this.$currentComponent) {
                return;
            }
            this._select(this.$currentComponent);
            this._edit(this.$currentComponent);
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
    property({ type: Object })
], CarpenterDaemonElement.prototype, "selectedComponent", void 0);
__decorate([
    property({ type: Object })
], CarpenterDaemonElement.prototype, "preselectedComponent", void 0);
//# sourceMappingURL=carpenterDaemon.element.js.map