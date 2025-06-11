import '@fontsource/poppins';
import __IconElement from '@lotsof/icon-element';
import '@lotsof/json-schema-form';
import __LitElement from '@lotsof/lit-element';
import { __whenEventListener } from '@lotsof/sugar/dom';
import { __isInIframe } from '@lotsof/sugar/is';
import { __escapeQueue, type THotkeySettings } from '@lotsof/sugar/keyboard';
import { html, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import '../../src/css/output/carpenter.build.css';
import __CarpenterVueProxy from '../../src/proxies/carpenterVueProxy.vue';
import {
  TCarpenterAdapter,
  TCarpenterComponent,
  TCarpenterGroup,
  TCarpenterMediaQuery,
} from '../shared/carpenter.type.js';
import { __Carpenter, __CarpenterDaemonElement } from './_exports.js';

// save the carpenter vue proxy to access globally
// @ts-ignore
window.__CarpenterVueProxy = __CarpenterVueProxy;

export default class CarpenterElement extends __LitElement {
  @property({ type: Object })
  public adapter?: TCarpenterAdapter | string;

  @property({ type: Object })
  public selectedComponent?: TCarpenterComponent;

  @property({ type: Object })
  public preselectedComponent?: TCarpenterComponent | null = null;

  @property({ type: String })
  public uiMode = 'light';

  @property({ type: Boolean })
  public appendToBody: boolean = true;

  @property({ type: Boolean })
  public addInternalName: boolean = false;

  @property({ type: Boolean })
  public centerContent: boolean = false;

  @property({ type: Object })
  public advancedGroup: TCarpenterGroup = {
    id: 'advanced',
    title: 'Advanced',
    type: 'stack',
    description: 'Advanced options for the component',
    icon: 'cog',
    buttonText: 'Open advanced options',
  };

  private _$iframe?: HTMLIFrameElement;
  private _$daemon?: __CarpenterDaemonElement;

  constructor() {
    super('s-carpenter');
    this.saveState = true;
  }

  private static _adapters: Record<string, TCarpenterAdapter> = {};
  public static registerAdapter(id: string, adapter: TCarpenterAdapter): void {
    if (this._adapters[id]) {
      throw new Error(
        `[s-carpenter] An adapter with id "${id}" already exists`,
      );
    }
    this._adapters[id] = adapter;
  }

  public get currentMediaQuery(): TCarpenterMediaQuery | undefined {
    return this.mediaQueries[this._currentMediaQuery];
  }

  public update(changedProperties: any): void {
    super.update(changedProperties);

    // update the daemon accordingly
    this._$daemon?.requestUpdate();

    if (changedProperties.has('selectedComponent')) {
      setTimeout(() => {
        this.requestUpdate();
      });
    }
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    // get the daemon reference
    const $daemon = this.querySelector('s-carpenter-daemon');
    __Carpenter.$iframe?.contentDocument?.body.appendChild($daemon as Node);
    this._$daemon = $daemon as __CarpenterDaemonElement;

    // init the daemon listeners
    this._initDaemonListeners();
  }

  async mount() {
    // if not in an iframe, init the environment
    // by creating an iframe and load the factory deamon
    // inside it
    if (__isInIframe()) {
      return;
    }

    // create the canvas
    const $canvas = document.createElement('div');
    $canvas.classList.add(...this.cls('_canvas'));
    if (this.lnf) {
      $canvas.classList.add('-lnf');
    }
    document.body.appendChild($canvas);

    // create the iframe
    const $iframe = document.createElement('iframe');
    $iframe.src = document.location.href;
    $iframe.classList.add(...this.cls('_iframe'));
    __Carpenter.$iframe = $iframe;

    // add the iframe to the canvas
    $canvas.appendChild($iframe);

    // wait the iframe to be loaded
    await __whenEventListener('load', $iframe);

    // if wanted, append the carpenter element to the body
    const $carpenter = document.querySelector(this.tagName);
    if (this.appendToBody && $carpenter) {
      this.log(
        `Appending the carpenter element to the body, as "appendToBody" is set to true`,
      );
      document.body.appendChild($carpenter);
    }

    // center the content if wanted
    if (this.centerContent) {
      // center the content in the iframe
      const $centerStyle = __Carpenter.$iframe?.contentDocument?.createElement(
        'style',
      ) as HTMLStyleElement;
      $centerStyle.innerHTML = `
      body {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        justify-content: center;
        align-items: center;
      }
    `;
      __Carpenter.$iframe?.contentWindow?.document.head.appendChild(
        $centerStyle,
      );
    }

    // register the deamon into the iframe
    __CarpenterDaemonElement.define('s-carpenter-daemon');

    // init the listeners like escape key, etc...
    this._initListeners(document);
    this._initListeners(__Carpenter.$iframe.contentDocument as Document);

    // dispatch the ready event
    __Carpenter.dispatchEvent('ready', {});
  }

  private _initDaemonListeners(): void {
    // listen for edit event from the daemon
    // @ts-ignore
    this._$daemon?.addEventListener(
      's-carpenter-daemon.select',
      (e: CustomEvent) => {
        this.dispatch('select', {
          bubbles: true,
          detail: e.detail,
        });
      },
    );
    // @ts-ignore
    this._$daemon?.addEventListener(
      's-carpenter-daemon.preselect',
      (e: CustomEvent) => {
        this.dispatch('preselect', {
          bubbles: true,
          detail: e.detail,
        });
      },
    );
  }

  private _initListeners(context: Document): void {
    const hotkeySettings: Partial<THotkeySettings> = {
      ctx: context,
    };

    // __hotkey(
    //   'escape',
    //   (e) => {
    //     this._currentAction = null;
    //   },
    //   hotkeySettings,
    // );
    // __hotkey(
    //   'cmd+s',
    //   (e) => {
    //     this._currentAction = 'saveValues';
    //   },
    //   hotkeySettings,
    // );
  }

  private _setSelectedComponent(component: TCarpenterComponent | null): void {
    // set the selected component
    this.selectedComponent = component ?? undefined;

    // add the "internalName" field into the component schema
    if (
      this.addInternalName &&
      this.selectedComponent &&
      !this.selectedComponent.schema?.properties?.internalName
    ) {
      if (!this.selectedComponent.schema?.properties) {
        this.selectedComponent.schema.properties = {};
      }
      this.selectedComponent.schema.properties.internalName = {
        type: 'string',
        title: 'Internal name',
        description: 'The internal name of the component',
        editor: {
          group: this.advancedGroup.id,
        },
      };
      if (
        !this.selectedComponent.schema.editor?.groups?.find(
          (group) => group.id === this.advancedGroup.id,
        )
      ) {
        if (!this.selectedComponent.schema?.editor) {
          this.selectedComponent.schema.editor = {};
        }
        if (!this.selectedComponent.schema.editor.groups) {
          this.selectedComponent.schema.editor.groups = [];
        }
        this.selectedComponent.schema.editor.groups.push(this.advancedGroup);
      }
    }

    // add an action in the escape queue
    __escapeQueue(
      () => {
        this.selectedComponent = undefined;
      },
      {
        ctx: [document, __Carpenter.$iframe?.contentDocument as Document],
      },
    );
    // dispatch the select event
    this.dispatch('select', {
      bubbles: true,
      detail: component,
    });
  }

  private _setPreselectedComponent(
    component: TCarpenterComponent | null,
  ): void {
    // set the preselected component
    this.preselectedComponent = component ?? undefined;

    // dispatch the preselect event
    this.dispatch('preselect', {
      bubbles: true,
      detail: component,
    });
  }

  public render() {
    return html`
      <s-carpenter-daemon
        .uiMode=${this.uiMode}
        .lnf=${this.lnf}
        .selectedComponent=${this.selectedComponent}
        .preselectedComponent=${this.preselectedComponent}
        .scrollOnSelect=${true}
        .scrollOnPreselect=${true}
        @s-carpenter-daemon.component.connect=${(e: CustomEvent) => {
          // add the component to the list
          // this._components[e.detail.id] = e.detail;
          // forward the event to the parent
          this.dispatch('component.connect', {
            bubbles: true,
            detail: e.detail,
          });
        }}
        @s-carpenter-daemon.component.disconnect=${(e: CustomEvent) => {
          // do nothing if no component is set
          // remove the component from the list
          // delete this._components[e.detail.id];
          // forward the event to the parent
          this.dispatch('component.disconnect', {
            bubbles: true,
            detail: e.detail,
          });
        }}
        @s-carpenter-daemon.preselect=${(e: CustomEvent) => {
          this._setPreselectedComponent(e.detail);
        }}
        @s-carpenter-daemon.select=${(e: CustomEvent) => {
          this._setSelectedComponent(e.detail);
        }}
        @s-carpenter-daemon.edit=${(e: CustomEvent) => {
          this.dispatch('edit', {
            bubbles: true,
            detail: e.detail,
          });
        }}
      ></s-carpenter-daemon>
    `;
  }
}

CarpenterElement.define('s-carpenter');
__IconElement.define('s-icon', {
  type: 'solid',
});
