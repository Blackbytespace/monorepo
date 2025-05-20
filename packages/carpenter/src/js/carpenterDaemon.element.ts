import __LitElement from '@lotsof/lit-element';
import { __injectStyle, __querySelectorLive } from '@lotsof/sugar/dom';
import { html, PropertyValues } from 'lit';
// @ts-ignore
import { __copyText } from '@lotsof/sugar/clipboard';
import { __isDarkMode } from '@lotsof/sugar/is';
import { property } from 'lit/decorators.js';
import __css from '../../src/css/carpenterDaemon.css?raw';
import { TCarpenterComponent } from '../shared/carpenter.type.js';

export default class CarpenterDaemonElement extends __LitElement {
  @property({ type: String })
  public uiMode: string = 'light';

  public selectedComponent: TCarpenterComponent | null = null;
  public preselectedComponent: TCarpenterComponent | null = null;
  public $selectedComponent: HTMLElement | null = null;
  public $preselectedComponent: HTMLElement | null = null;

  constructor() {
    super('s-carpenter-daemon');
  }

  get $document(): Document {
    return this.ownerDocument;
  }

  get $window(): Window {
    // @ts-ignore
    return this.$document.defaultView || this.$document.parentWindow;
  }

  get component(): TCarpenterComponent | null {
    return this.preselectedComponent ?? this.selectedComponent;
  }

  get $component(): HTMLElement | null {
    return this.$preselectedComponent ?? this.$selectedComponent;
  }

  protected update(changedProperties: PropertyValues): void {
    super.update(changedProperties);

    // update the daemon position
    setTimeout(() => {
      this._updateDaemonPosition();
    }, 100);
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    // set the daemon ui mode depending on
    // the mode of the website
    if (
      __isDarkMode({
        rootNode: this as HTMLElement,
      })
    ) {
      this.classList.add('-light');
      this.classList.remove('-dark');
    } else {
      this.classList.add('-dark');
      this.classList.remove('-light');
    }
  }

  public getComponentJson($component: HTMLElement): TCarpenterComponent | null {
    const componentJson = JSON.parse(
      $component
        .querySelector(`#${$component.getAttribute('id')}-data`)
        ?.textContent?.trim() ?? '{}',
    ) as TCarpenterComponent;

    return componentJson;
  }

  public adoptedCallback(): void {
    // inject the stylesheet
    __injectStyle(__css, {
      id: 's-carpenter-daemon-css',
      rootNode: this.$document.head,
    });

    // query live for all the components
    __querySelectorLive(
      '[type="carpenter/component"]',
      ($component) => {
        this._initComponent($component);
      },
      {
        disconnectedCallback: ($component: Element): void => {
          this._deleteComponent($component);
        },
        rootNode: this.$document,
      },
    );

    // update the position of the daemon on resize
    this.$window.addEventListener('resize', () => {
      this._updateDaemonPosition();
    });
  }

  private _initComponent($component: HTMLElement): void {
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

  private _preselect($component: HTMLElement): void {
    if (
      this.$preselectedComponent &&
      this.$preselectedComponent === $component
    ) {
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

  private _select($component: HTMLElement): void {
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

  private _edit($component: HTMLElement): void {
    this.dispatch('edit', {
      bubbles: true,
      detail: this.getComponentJson($component),
    });
  }

  private _deleteComponent($component: Element): void {
    this.dispatch('component.disconnect', {
      bubbles: true,
      detail: {
        id: $component.getAttribute('id'),
      },
    });
  }

  private _updateDaemonPosition(): void {
    const top = this.$component?.getBoundingClientRect().top;
    const left = this.$component?.getBoundingClientRect().left;
    const width = this.$component?.getBoundingClientRect().width;
    const height = this.$component?.getBoundingClientRect().height;

    this.style.top = `${top}px`;
    this.style.left = `${left}px`;
    this.style.width = `${width}px`;
    this.style.height = `${height}px`;
  }

  public render() {
    return html`<div
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
        <span class="${this.cls('_title')}">${this.component?.name}</span>
        ${this.component?.values?.id
          ? html`
              <button
                class="${this.cls('_id')}"
                @click=${() => {
                  __copyText(this.component?.values?.id ?? '');
                }}
              >
                ${this.component?.values?.id}
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
