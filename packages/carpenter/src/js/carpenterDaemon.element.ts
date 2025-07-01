import __LitElement from '@blackbyte/lit-element';
import { __querySelectorLive } from '@blackbyte/sugar/dom';
import { html, PropertyValues } from 'lit';
// @ts-ignore
import { __copyText } from '@blackbyte/sugar/clipboard';
import { __isDarkMode } from '@blackbyte/sugar/is';
import { property } from 'lit/decorators.js';
import '../../src/css/output/carpenter.build.css';
import {
  TCarpenterComponent,
  TCarpenterPreselectComponentSettings,
} from '../shared/carpenter.type.js';
import __Carpenter from './carpenter.js';

export default class CarpenterDaemonElement extends __LitElement {
  @property({ type: Boolean })
  public scrollOnSelect: boolean = false;

  @property({ type: Boolean })
  public scrollOnPreselect: boolean = false;

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

  get component(): TCarpenterComponent | undefined {
    return __Carpenter.preselectedComponent ?? __Carpenter.selectedComponent;
  }

  public mount() {
    __Carpenter.addEventListener('update', () => {
      setTimeout(() => {
        this._updateDaemonPosition();
      }, 200);
    });
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    // update the ui mode depending on the
    // mode of the website
    this.updateUiMode();
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

  public adoptedCallback(): void {
    // update the ui mode dependingon the
    // mode of the website
    this.updateUiMode();

    // query live for all the components
    __querySelectorLive(
      '[carpenter]',
      ($component) => {
        if (!$component.parentElement) {
          return;
        }
        // init the component
        this._initComponent($component);
      },
      {
        disconnectedCallback: ($component: HTMLElement): void => {
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
    // update the conponent if one is already registered
    const existingComponent = __Carpenter.getComponent(
      $component.getAttribute('carpenter') ?? '',
    );

    // if the component is already registered
    // update his $component property
    if (existingComponent) {
      // __Carpenter.update$ComponentRef($component, $component);
      existingComponent.$component = $component;
    }

    // get the component from carpenter
    const component = __Carpenter.getComponent($component);

    // when mouseenter, trigger the preselect event
    $component.addEventListener('mouseenter', () => {
      const component = __Carpenter.getComponent($component);
      if (!component) {
        return;
      }
      // this.preselect($component);
      this._preselect(component, {
        preventScroll: true,
      });
    });
  }

  private _preventScroll = false;
  private _preselect(
    component: TCarpenterComponent,
    settings?: TCarpenterPreselectComponentSettings,
  ): void {
    __Carpenter.preselectComponent(component, settings);
    this._onPreselect(component);
    this._preventScroll = settings?.preventScroll ?? false;
  }

  private _onPreselect(component: TCarpenterComponent): void {
    // update the daemon position
    this._updateDaemonPosition();

    // scroll to the component if the scroll setting is true
    if (this.scrollOnPreselect && !this._preventScroll) {
      component.$component.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }

    this._preventScroll = false;
    this.requestUpdate();
  }

  private _select(component: TCarpenterComponent): void {
    // select the component
    __Carpenter.selectComponent(component);
    this._onSelect(component);
  }

  // select actions
  private _onSelect(component: TCarpenterComponent): void {
    // update the daemon position
    this._updateDaemonPosition();

    // scroll to the component if the scroll setting is true
    if (this.scrollOnSelect) {
      component.$component.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }

  private _edit(component: TCarpenterComponent): void {
    __Carpenter.dispatchEvent('edit', {
      component,
    });
  }

  private _deleteComponent($component: HTMLElement): void {
    __Carpenter.removeComponent($component);
  }

  private _updateDaemonPosition(): void {
    if (!this.component) {
      return;
    }

    const top = this.component.$component?.getBoundingClientRect().top ?? 0;
    const left = this.component.$component?.getBoundingClientRect().left ?? 0;
    const width = this.component.$component?.getBoundingClientRect().width;
    const height = this.component.$component?.getBoundingClientRect().height;

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
        if (!__Carpenter.preselectedComponent) {
          return;
        }
        this._select(__Carpenter.preselectedComponent);
        this._edit(__Carpenter.preselectedComponent);
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
            if (!__Carpenter.preselectedComponent) {
              return;
            }
            this._select(__Carpenter.preselectedComponent);
            this._edit(__Carpenter.preselectedComponent);
          }}
        >
          <span class="${this.cls('_tool-label')}">Edit</span>
          <s-icon type="solid" name="pencil"></s-icon>
        </button>
      </div>
    </div> `;
  }
}
