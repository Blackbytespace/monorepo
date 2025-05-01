import __LitElement from '@lotsof/lit-element';
import { __escapeQueue } from '@lotsof/sugar/keyboard';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../../../src/components/stackGroupRenderer/stackGroupRenderer.bare.css';

// @ts-ignore
@customElement('s-json-schema-form-stack-group-renderer')
export default class CarpenterStackGroupRenderer extends __LitElement {
  @property({ type: String })
  public buttonText: string = 'Open options';

  @property({ type: Boolean })
  public isOpen: boolean = false;

  @property({ type: Object })
  public renderedProps: any = null;

  private _escapeQueue: any = null;

  constructor() {
    super('s-json-schema-form-stack-group-renderer');
  }

  private _clickOutsideHandler = (e: MouseEvent) => {
    if (this.contains(e.target as HTMLElement)) {
      return;
    }
    this.close();
  };

  public updateSizeProperties(): void {
    const $group = this.children[0] as HTMLElement;
    if (!$group) {
      return;
    }
    const boundingRect = $group.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const maxHeight = Math.floor(viewportHeight - boundingRect.y);
    const groupHeight = $group.scrollHeight;

    console.log(groupHeight, maxHeight);

    if (groupHeight > maxHeight && maxHeight < boundingRect.y) {
      $group.style.setProperty(
        '--s-json-schema-form-group-translate-y',
        `${groupHeight * -1}px`,
      );
    }

    $group.style.setProperty(
      '--s-json-schema-form-group-max-height',
      `${viewportHeight - boundingRect.y}px`,
    );
  }

  public open(): void {
    this.isOpen = true;
    this.classList.add('-open');
    this._escapeQueue = __escapeQueue(() => {
      this.close();
    });
    document.addEventListener('click', this._clickOutsideHandler);

    // update size
    this.updateSizeProperties();

    // put focus on first input
    const $control = this.querySelector(
      'input, select, textarea',
    ) as HTMLElement;
    $control?.focus();
  }

  public close(): void {
    console.log('close');
    this.isOpen = false;
    this.classList.remove('-open');
    this._escapeQueue?.cancel?.();
    document.removeEventListener('click', this._clickOutsideHandler);
  }

  protected render(): any {
    return html` <div class=${this.cls('_container')}>
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
}
