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
import __LitElement from '@blackbyte/lit-element';
import { __copyText } from '@blackbyte/sugar/clipboard';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { codeToHtml } from 'shiki';
import '../../src/css/code.element.css';
/**
 * @name                CodeElement
 * @as                  Code Element
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/codeElement.types.ts
 * @platform            html
 * @status              beta
 *
 * Simple code element that allows you to display code snippets with syntax highlighting
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @import          import { CodeElement } from '@blackbyte/code-element';
 *
 * @snippet         CodeElement($1)
 *
 * @install           shell
 * npm i @blackbyte/code-element
 *
 * @install           js
 * import CodeElement from '@blackbyte/code-element';
 * CodeElement.define();
 *
 * @example         html            Simple example
 * <s-code language="javascript">
 *   console.log('Hello World');
 * </s-code>
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
export default class CodeElement extends __LitElement {
    constructor() {
        super('s-code');
        this.language = 'html';
        this.filename = '';
        this.theme = 'github-dark';
        this.header = false;
        this.copyIcon = `<s-icon name="clipboard" provider="pixelarticons"></s-icon>`;
        this.code = '';
        this.$code = null;
    }
    copyCode() {
        var _a, _b;
        __copyText((_b = (_a = this.$code) === null || _a === void 0 ? void 0 : _a.innerText) !== null && _b !== void 0 ? _b : '');
    }
    connectedCallback() {
        this.code = this.innerText.trim();
        this.innerHTML = '';
        super.connectedCallback();
    }
    firstUpdated(_changedProperties) {
        const _super = Object.create(null, {
            firstUpdated: { get: () => super.firstUpdated }
        });
        return __awaiter(this, void 0, void 0, function* () {
            // get the code element to inject later code into
            this.$code = this.querySelector('.s-code_code');
            // convert the code to HTML
            const html = yield codeToHtml(this.code, {
                lang: this.language,
                theme: this.theme,
            });
            // set the compiled code
            if (this.$code) {
                this.$code.innerHTML = html;
            }
            // add some classes on the element itself
            this.classList.add('-ready', `-${this.language}`);
            _super.firstUpdated.call(this, _changedProperties);
        });
    }
    render() {
        return html `<div class="${this.cls('_wrapper')} ${this.language}">
      ${this.header
            ? html `
            <div class="${this.cls('_header')}">
              <div class="${this.cls('_metas')}">
                ${this.filename
                ? html `
                      <div class="${this.cls('_filename')}">
                        ${this.filename}
                      </div>
                    `
                : ''}
                <div class="${this.cls('_language')}">
                  <span class="${this.cls('_language-parenthesis')}">(</span
                  >${this.language}<span
                    class="${this.cls('_language-parenthesis')}"
                    >)</span
                  >
                </div>
              </div>
              <div class="${this.cls('_tools')}">
                <button
                  class="${this.cls('_copy')}"
                  @click="${() => this.copyCode()}"
                >
                  <span class="${this.cls('_copy-text')}">Copy</span>
                  ${unsafeHTML(this.copyIcon)}
                </button>
              </div>
            </div>
          `
            : ''}
      <div class="${this.cls('_code')}"></div>
      <div class="${this.cls('_footer')}"></div>
    </div>`;
    }
}
__decorate([
    property({ type: String })
], CodeElement.prototype, "language", void 0);
__decorate([
    property({ type: String })
], CodeElement.prototype, "filename", void 0);
__decorate([
    property({ type: String })
], CodeElement.prototype, "theme", void 0);
__decorate([
    property({ type: Boolean })
], CodeElement.prototype, "header", void 0);
__decorate([
    property({ type: String })
], CodeElement.prototype, "copyIcon", void 0);
//# sourceMappingURL=code.element.js.map