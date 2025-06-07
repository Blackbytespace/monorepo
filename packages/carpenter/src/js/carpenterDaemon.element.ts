import __LitElement from '@lotsof/lit-element';
import { __querySelectorLive } from '@lotsof/sugar/dom';
import { html, PropertyValues } from 'lit';
// @ts-ignore
import { __copyText } from '@lotsof/sugar/clipboard';
import { __isDarkMode } from '@lotsof/sugar/is';
import { property } from 'lit/decorators.js';
import '../../src/css/output/carpenter.build.css';
import { TCarpenterComponentSpecs } from '../shared/carpenter.type.js';
import { TCarpenterDaemonPreselectSettings } from './_exports.js';

export default class CarpenterDaemonElement extends __LitElement {
  @property({ type: Object })
  public preselectedComponent: TCarpenterComponentSpecs | null = null;

  @property({ type: Object })
  public selectedComponent: TCarpenterComponentSpecs | null = null;

  @property({ type: Boolean })
  public scrollOnSelect: boolean = false;

  @property({ type: Boolean })
  public scrollOnPreselect: boolean = false;

  private _$selectedComponent: HTMLElement | null = null;
  private _$preselectedComponent: HTMLElement | null = null;

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

  get component(): TCarpenterComponentSpecs | null {
    return this.preselectedComponent ?? this.selectedComponent;
  }

  get $component(): HTMLElement | null {
    return this._$preselectedComponent ?? this._$selectedComponent;
  }

  get $selectedComponent(): HTMLElement | null {
    return this._$selectedComponent;
  }

  get $preselectedComponent(): HTMLElement | null {
    return this._$preselectedComponent;
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    // update the ui mode depending on the
    // mode of the website
    this.updateUiMode();
  }

  protected update(changedProperties: PropertyValues): void {
    super.update(changedProperties);

    // preselect the component if the preselectedComponent property has changed
    if (changedProperties.has('preselectedComponent')) {
      if (this.preselectedComponent) {
        this._$preselectedComponent = this._get$Component(
          this.preselectedComponent,
        );
        if (this._$preselectedComponent) {
          this._onPreselect(this._$preselectedComponent);
        }
      } else {
        this._$preselectedComponent = null;
      }
    }

    // preselect the component if the preselectedComponent property has changed
    if (changedProperties.has('selectedComponent')) {
      if (this.selectedComponent) {
        this._$selectedComponent = this._get$Component(this.selectedComponent);
        if (this._$selectedComponent) {
          this._onSelect(this._$selectedComponent);
        }
      } else {
        this._$selectedComponent = null;
      }
    }
  }

  protected updateUiMode(): void {
    // set the daemon ui mode depending on
    // the mode of the website
    if (
      __isDarkMode({
        rootNode: this.parentElement as HTMLElement,
      })
    ) {
      this.classList.add('-light');
      this.classList.remove('-dark');
    } else {
      this.classList.add('-dark');
      this.classList.remove('-light');
    }
  }

  public getComponentJson(
    $component: HTMLElement,
  ): TCarpenterComponentSpecs | null {
    const componentJson = JSON.parse(
      $component
        .querySelector(`#${$component.getAttribute('id')}-specs`)
        ?.textContent?.trim() ?? '{}',
    ) as TCarpenterComponentSpecs;

    return componentJson;
  }

  public adoptedCallback(): void {
    // update the ui mode dependingon the
    // mode of the website
    this.updateUiMode();

    // query live for all the components
    __querySelectorLive(
      '[type="carpenter/component"]',
      ($component) => {
        if (!$component.parentElement) {
          return;
        }
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

  private _get$Component(
    component: TCarpenterComponentSpecs,
  ): HTMLElement | null {
    return this.$document.querySelector(
      `[type="carpenter/component"][id="${component.id}"]`,
    );
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
      // this.preselect($component);
      this._preselect($component, {
        preventScroll: true,
      });
    });
  }

  private _preventScroll = false;
  private _preselect(
    $component: HTMLElement,
    settings?: TCarpenterDaemonPreselectSettings,
  ): void {
    if (
      this._$preselectedComponent &&
      this._$preselectedComponent === $component
    ) {
      return;
    }

    this._preventScroll = settings?.preventScroll ?? false;

    const preselectedComponent = this.getComponentJson($component);
    this.dispatch('preselect', {
      bubbles: true,
      detail: preselectedComponent,
    });
  }

  private _onPreselect($component: HTMLElement): void {
    // update the daemon position
    this._updateDaemonPosition();

    // scroll to the component if the scroll setting is true
    if (this.scrollOnPreselect && !this._preventScroll) {
      $component.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }

    this._preventScroll = false;

    this.requestUpdate();
  }

  private _select($component: HTMLElement): void {
    if (this._$selectedComponent && this._$selectedComponent === $component) {
      return;
    }
    const selectedComponent = this.getComponentJson($component);
    this.dispatch('select', {
      bubbles: true,
      detail: selectedComponent,
    });
  }

  // select actions
  private _onSelect($component: HTMLElement): void {
    // update the daemon position
    this._updateDaemonPosition();

    // scroll to the component if the scroll setting is true
    if (this.scrollOnSelect) {
      $component.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
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
    const top = this.$component?.getBoundingClientRect().top ?? 0;
    const left = this.$component?.getBoundingClientRect().left ?? 0;
    const width = this.$component?.getBoundingClientRect().width;
    const height = this.$component?.getBoundingClientRect().height;

    const scrollTop =
      this.$window.scrollY || this.$document.documentElement.scrollTop;
    const scrollLeft =
      this.$window.scrollX || this.$document.documentElement.scrollLeft;

    this.style.top = `${top + scrollTop}px`;
    this.style.left = `${left + scrollLeft}px`;
    this.style.width = `${width}px`;
    this.style.height = `${height}px`;
  }

  public render() {
    return html`<div
      class="${`${this.cls('_inner')}`}"
      @dblclick=${() => {
        if (!this._$preselectedComponent) {
          return;
        }
        this._select(this._$preselectedComponent);
        this._edit(this._$preselectedComponent);
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
        <button
          class="${this.cls('_tool')}"
          @click=${() => {
            if (!this._$preselectedComponent) {
              return;
            }
            this._select(this._$preselectedComponent);
            this._edit(this._$preselectedComponent);
          }}
        >
          <span class="${this.cls('_tool-label')}">Edit</span>
          <s-icon type="solid" name="pencil"></s-icon>
        </button>
      </div>
    </div> `;
  }
}
