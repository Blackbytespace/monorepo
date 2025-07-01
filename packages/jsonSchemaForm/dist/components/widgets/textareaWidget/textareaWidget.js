var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import __LitElement from '@lotsof/lit-element';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../../../../src/components/widgets/textareaWidget/textareaWidget.bare.css';
// @ts-ignore
let JsonSchemaFormTextareaWidget = class JsonSchemaFormTextareaWidget extends __LitElement {
    constructor() {
        super('s-json-schema-form-textarea-widget');
        this.value = '';
    }
    render() {
        var _a, _b, _c, _d;
        return html ` <div class=${this.cls('_textarea-widget')}>
      <textarea
        class="${this.cls('_textarea')} form-textarea"
        @change=${(e) => {
            var _a;
            const target = e.target;
            (_a = this.applyUpdate) === null || _a === void 0 ? void 0 : _a.call(this, target.value);
        }}
        rows="${(_c = (_b = (_a = this.schema) === null || _a === void 0 ? void 0 : _a.editor) === null || _b === void 0 ? void 0 : _b.rows) !== null && _c !== void 0 ? _c : 5}"
        .value=${(_d = this.value) !== null && _d !== void 0 ? _d : ''}
      >
      </textarea>
    </div>`;
    }
};
__decorate([
    property({ type: Function })
], JsonSchemaFormTextareaWidget.prototype, "applyUpdate", void 0);
__decorate([
    property({ type: String })
], JsonSchemaFormTextareaWidget.prototype, "value", void 0);
__decorate([
    property({ type: Object })
], JsonSchemaFormTextareaWidget.prototype, "schema", void 0);
JsonSchemaFormTextareaWidget = __decorate([
    customElement('s-json-schema-form-textarea-widget')
], JsonSchemaFormTextareaWidget);
export default JsonSchemaFormTextareaWidget;
//# sourceMappingURL=textareaWidget.js.map