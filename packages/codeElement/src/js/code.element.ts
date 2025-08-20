import __LitElement from '@blackbyte/lit-element';
import { __copyText } from '@blackbyte/sugar/clipboard';
import { html, PropertyValues } from 'lit';
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
  @property({ type: String })
  public language: string = 'html';

  @property({ type: String })
  public filename: string = '';

  @property({ type: String })
  public theme: string = 'github-dark';

  @property({ type: Boolean })
  public header: boolean = false;

  @property({ type: String })
  public copyIcon: string = `<s-icon name="clipboard" provider="pixelarticons"></s-icon>`;

  private code: string = '';
  private $code: HTMLElement | null = null;

  constructor() {
    super('s-code');
  }

  public copyCode(): void {
    __copyText(this.$code?.innerText ?? '');
  }

  public connectedCallback(): void {
    this.code = this.innerText.trim();
    this.innerHTML = '';
    super.connectedCallback();
  }

  public async firstUpdated(_changedProperties: PropertyValues): Promise<void> {
    // get the code element to inject later code into
    this.$code = this.querySelector('.s-code_code');

    // convert the code to HTML
    const html = await codeToHtml(this.code, {
      lang: this.language,
      theme: this.theme,
    });

    // set the compiled code
    if (this.$code) {
      this.$code.innerHTML = html;
    }

    // add some classes on the element itself
    this.classList.add('-ready', `-${this.language}`);

    super.firstUpdated(_changedProperties);
  }

  public render() {
    return html`<div class="${this.cls('_wrapper')} ${this.language}">
      ${this.header
        ? html`
            <div class="${this.cls('_header')}">
              <div class="${this.cls('_metas')}">
                ${this.filename
                  ? html`
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
