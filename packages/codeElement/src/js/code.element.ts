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

  @property({ type: String })
  public copyStr: string = 'Copy';

  @property({ type: String })
  public copiedIcon: string =
    '<s-icon name="check" provider="pixelarticons"></s-icon>';

  @property({ type: String })
  public copiedStr: string = 'Copied';

  @property({ type: Number })
  public copiedTimeout: any = 1000;

  @property({ type: String })
  public code: string = '';

  private _$code: HTMLElement | null = null;
  private _copyTimeout: number | null = null;

  constructor() {
    super('s-code');
  }

  public copyCode(): void {
    // avoid copying multiple times
    if (this._copyTimeout) {
      return;
    }

    // add the copied class
    this.classList.add('-copied');

    // @ts-ignore
    this._copyTimeout = setTimeout(() => {
      this._copyTimeout = null;

      this.classList.remove('-copied');

      this.requestUpdate();
    }, this.copiedTimeout);
    this.requestUpdate();
    __copyText(this._$code?.innerText ?? '');
  }

  public connectedCallback(): void {
    if (!this.code) {
      this.code = this.innerText.trim();
    }
    this.innerHTML = '';
    super.connectedCallback();
  }

  public async firstUpdated(_changedProperties: PropertyValues): Promise<void> {
    super.firstUpdated(_changedProperties);

    // get the code element to inject later code into
    this._$code = this.querySelector('.s-code_code');

    // convert the code to HTML
    const html = await codeToHtml(this.code, {
      lang: this.language,
      theme: this.theme,
    });

    // set the compiled code
    if (this._$code) {
      this._$code.innerHTML = html;
    }

    // add some classes on the element itself
    this.classList.add('-ready', `-${this.language}`);
  }

  public render() {
    return html`<div class="${this.cls('_wrapper')} ${this.language} ">
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
                  ${this._copyTimeout
                    ? html`
                        <span class="${this.cls('_copy-text')}"
                          >${this.copiedStr}</span
                        >
                        ${unsafeHTML(this.copiedIcon)}
                      `
                    : html`
                        <span class="${this.cls('_copy-text')}"
                          >${this.copyStr}</span
                        >
                        ${unsafeHTML(this.copyIcon)}
                      `}
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
