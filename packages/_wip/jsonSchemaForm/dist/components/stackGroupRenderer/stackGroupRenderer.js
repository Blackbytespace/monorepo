var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import __LitElement from '@lotsof/lit-element';
import { __escapeQueue } from '@lotsof/sugar/keyboard';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../../../src/components/stackGroupRenderer/stackGroupRenderer.bare.css';
// @ts-ignore
let CarpenterStackGroupRenderer = class CarpenterStackGroupRenderer extends __LitElement {
    constructor() {
        super('s-json-schema-form-stack-group-renderer');
        this.buttonText = 'Open options';
        this.isOpen = false;
        this.renderedProps = null;
        this._escapeQueues = [];
        this._clickOutsideHandler = (e) => {
            if (this.contains(e.target)) {
                return;
            }
            this.close();
        };
    }
    updateSizeProperties() {
        const $group = this.children[0];
        if (!$group) {
            return;
        }
        const boundingRect = $group.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const maxHeight = Math.floor(viewportHeight - boundingRect.y);
        const groupHeight = $group.scrollHeight;
        if (groupHeight > maxHeight && maxHeight < boundingRect.y) {
            $group.style.setProperty('--s-json-schema-form-group-translate-y', `${groupHeight * -1}px`);
        }
        $group.style.setProperty('--s-json-schema-form-group-max-height', `${viewportHeight - boundingRect.y}px`);
    }
    open() {
        this.isOpen = true;
        this.classList.add('-open');
        this._escapeQueues.push(__escapeQueue(() => {
            this.close();
        }));
        document.addEventListener('click', this._clickOutsideHandler);
        // update size
        this.updateSizeProperties();
        // put focus on first input
        const $control = this.querySelector('input, select, textarea');
        $control === null || $control === void 0 ? void 0 : $control.focus();
    }
    close() {
        var _a, _b, _c;
        console.log('close');
        this.isOpen = false;
        this.classList.remove('-open');
        (_c = (_b = (_a = this._escapeQueues) === null || _a === void 0 ? void 0 : _a.pop()) === null || _b === void 0 ? void 0 : _b.cancel) === null || _c === void 0 ? void 0 : _c.call(_b);
        document.removeEventListener('click', this._clickOutsideHandler);
    }
    render() {
        return html ` <div class=${this.cls('_container')}>
      <button
        class="${this.cls('_button')} button -outline"
        @click=${() => {
            this.open();
        }}
      >
        ${this.buttonText}
      </button>
    </div>`;
    }
};
__decorate([
    property({ type: String })
], CarpenterStackGroupRenderer.prototype, "buttonText", void 0);
__decorate([
    property({ type: Boolean })
], CarpenterStackGroupRenderer.prototype, "isOpen", void 0);
__decorate([
    property({ type: Object })
], CarpenterStackGroupRenderer.prototype, "renderedProps", void 0);
CarpenterStackGroupRenderer = __decorate([
    customElement('s-json-schema-form-stack-group-renderer')
], CarpenterStackGroupRenderer);
export default CarpenterStackGroupRenderer;
//# sourceMappingURL=stackGroupRenderer.js.map