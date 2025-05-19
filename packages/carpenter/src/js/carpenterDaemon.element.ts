import __LitElement from '@lotsof/lit-element';
import { __injectStyle, __querySelectorLive } from '@lotsof/sugar/dom';
import { html } from 'lit';
// @ts-ignore
import { property } from 'lit/decorators.js';
import __css from '../../src/css/carpenterDaemon.css?raw';
import { TCarpenterComponent } from '../shared/carpenter.type.js';

export default class CarpenterDaemonElement extends __LitElement {
  @property({ type: Object })
  public selectedComponent: TCarpenterComponent | null = null;

  @property({ type: Object })
  public preselectedComponent: TCarpenterComponent | null = null;

  public $currentComponent: HTMLElement | null = null;

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
      this._setDaemonPosition();
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

  private _preselect($component: HTMLElement): void {
    this.dispatch('preselect', {
      bubbles: true,
      detail: this.getComponentJson($component),
    });
  }

  private _select($component: HTMLElement): void {
    this.dispatch('select', {
      bubbles: true,
      detail: this.getComponentJson($component),
    });
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

  private _setComponent($component: HTMLElement): void {
    // do nothing if the component is already set
    if (this.$currentComponent === $component) {
      return;
    }
    // set the current component
    this.$currentComponent = $component;
    // update the position of the daemon
    this._setDaemonPosition();
  }

  private _setDaemonPosition(): void {
    const top = this.$currentComponent?.getBoundingClientRect().top;
    const left = this.$currentComponent?.getBoundingClientRect().left;
    const width = this.$currentComponent?.getBoundingClientRect().width;
    const height = this.$currentComponent?.getBoundingClientRect().height;

    this.style.top = `${top}px`;
    this.style.left = `${left}px`;
    this.style.width = `${width}px`;
    this.style.height = `${height}px`;
  }

  public render() {
    return html`<div class="${this.cls('_inner')}">
      <div class="${this.cls('_header')}">
        <div class="${this.cls('_title')}">${this.selectedComponent?.name}</div>
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
