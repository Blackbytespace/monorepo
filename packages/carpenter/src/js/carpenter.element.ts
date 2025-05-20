import '@fontsource/poppins';
import __IconElement from '@lotsof/icon-element';
import '@lotsof/json-schema-form';
import __JsonSchemaFormElement from '@lotsof/json-schema-form';
import __LitElement from '@lotsof/lit-element';
import { __injectHtml } from '@lotsof/sugar/dom';
import { __isInIframe } from '@lotsof/sugar/is';
import { type THotkeySettings } from '@lotsof/sugar/keyboard';
import { __clone, __set } from '@lotsof/sugar/object';
import { html, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import '../../src/css/output/carpenter.build.css';
import {
  TCarpenterAdapter,
  TCarpenterComponent,
  TCarpenterMediaQuery,
  TCarpenterNotification,
  TCarpenterState,
  TCarpenterUpdateObject,
  TCarpenterUpdatePayload,
} from '../shared/carpenter.type.js';
import __CarpenterDaemonElement from './carpenterDaemon.element.js';

export default class CarpenterElement extends __LitElement {
  @property({ type: Object })
  public mediaQueries: Record<string, TCarpenterMediaQuery> = {};

  @property({ type: String })
  public mediaQuery: string = 'desktop';

  @property({ type: Object })
  public adapter?: TCarpenterAdapter | string;

  @property({ type: Object })
  public selectedComponent?: TCarpenterComponent;

  @property({ type: Object })
  public preselectedComponent?: TCarpenterComponent | null = null;

  @property({ type: String })
  public darkModeClass: string = '-dark';

  @property({ type: Function })
  public loaded?: Function;

  @property({ type: String })
  public uiMode = 'light';

  @state()
  public _notifications: TCarpenterNotification[] = [];

  @state()
  public _currentMediaQuery: string = '';

  @state()
  public _currentAction: 'saveValues' | null = null;

  @state()
  protected _state: TCarpenterState = {};

  private _components: Record<string, TCarpenterComponent> = {};
  private _$iframe?: HTMLIFrameElement;
  private _$canvas?: HTMLDivElement;
  private _$daemon?: __CarpenterDaemonElement;
  private _$jsonSchemaForm?: __JsonSchemaFormElement;

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

    // get the json schema form
    if (!this._$jsonSchemaForm) {
      this._$jsonSchemaForm = this.querySelector(
        's-json-schema-form',
      ) as __JsonSchemaFormElement;
    }
    // update the media query
    if (changedProperties.has('_currentMediaQuery')) {
      if (this.currentMediaQuery?.max !== -1) {
        this._$canvas?.style.setProperty(
          '--s-carpenter-canvas-width',
          this.currentMediaQuery?.max + 'px',
        );
      } else {
        this._$canvas?.style.removeProperty('--s-carpenter-canvas-width');
      }
      setTimeout(() => {
        this._updateIframeSize();
      }, 300);
    }

    if (this._$jsonSchemaForm) {
      // @TODO       find a better way to update the form without using setTimeout
      setTimeout(() => {
        // @ts-ignore
        this._$jsonSchemaForm.requestUpdate();
      });
    }
  }

  // private _updateMediaQueries(): void {
  //   // get the computed style of the document (iframe)
  //   const style = this._$iframe?.contentWindow?.getComputedStyle(
  //     this.$iframeDocument?.body as Element,
  //   );

  //   // try to get the media queries from the css variables (sugarcss)
  //   ['mobile', 'tablet', 'desktop', 'wide'].forEach((media) => {
  //     const min = parseInt(
  //         style?.getPropertyValue(`--s-media-${media}-min`) ?? '0',
  //       ),
  //       max = parseInt(
  //         style?.getPropertyValue(`--s-media-${media}-max`) ?? '0',
  //       );

  //     if (min || max) {
  //       const query: TCarpenterMediaQuery = {
  //         name: media,
  //         min: min ? min : -1,
  //         max: max ? max : -1,
  //       };
  //       this.mediaQueries[media] = query;
  //     }
  //   });

  //   // init the media query if not set
  //   if (
  //     !this._currentMediaQuery &&
  //     Object.keys(this.mediaQueries ?? {}).length
  //   ) {
  //     this._currentMediaQuery = Object.keys(this.mediaQueries)[0];
  //   }

  //   // make sure we update the UI
  //   this.requestUpdate();
  // }

  public get $iframeDocument(): Document | null | undefined {
    return this._$iframe?.contentDocument;
  }

  public get $iframe(): HTMLIFrameElement | undefined {
    return this._$iframe;
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    // get the daemon reference
    const $daemon = this.querySelector('s-carpenter-daemon');
    this._$iframe?.contentDocument?.body.appendChild($daemon as Node);
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

    // load the environment by
    // creating the iframe etc...
    await this._initEnvironment();

    // init the listeners like escape key, etc...
    this._initListeners(document);
    this._initListeners(this.$iframeDocument as Document);
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

  private async _initEnvironment(): Promise<void> {
    this.log(`Init the carpenter environment...`);

    // create the canvas
    const $canvas = document.createElement('div');
    $canvas.classList.add(...this.cls('_canvas'));
    if (this.lnf) {
      $canvas.classList.add('-lnf');
    }
    document.body.appendChild($canvas);

    // create the iframe
    const $iframe = document.createElement('iframe');
    $iframe.classList.add(...this.cls('_iframe'));
    // __iframeAutoSize($iframe, { width: false, height: true });
    this._$iframe = $iframe;

    // append the iframe to the body
    let iframeLoaded = false;
    const iframeLoadedPromise = new Promise((resolve) => {
      $iframe.addEventListener('load', () => {
        if (iframeLoaded) {
          return;
        }
        iframeLoaded = true;
        this.dispatch('ready', {
          bubbles: true,
          cancelable: false,
          detail: this,
        });
        resolve(true);
      });
    });
    $canvas.appendChild($iframe);
    await iframeLoadedPromise;

    // update the media queries
    // this._updateMediaQueries();

    const domParser = new DOMParser();
    const doc = domParser.parseFromString(
      document.documentElement.outerHTML,
      'text/html',
    );
    doc.body.querySelector('s-factory')?.remove();
    doc.body.querySelector('s-carpenter')?.remove();
    doc.body.querySelector('s-carpenter-daemon')?.remove();
    doc.body.querySelector('.s-carpenter_canvas')?.remove();

    // copy the document into the iframe
    $iframe?.contentWindow?.document.open();
    $iframe?.contentWindow?.document.write(doc.documentElement.outerHTML);
    $iframe?.contentWindow?.document.close();

    // clean the iframe
    this.$iframeDocument?.querySelector(`.${this.cls('_iframe')}`)?.remove();
    this.$iframeDocument?.querySelector(this.tagName)?.remove();

    // center the content in the iframe
    const $centerStyle = this._$iframe?.contentDocument?.createElement(
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
    $iframe.contentWindow?.document.head.appendChild($centerStyle);

    // if we have some html provided in the component,
    // set it into the iframe
    setTimeout(() => {
      if (this.selectedComponent?.html) {
        this._setIframeContent(this.selectedComponent.html);
      }
    }, 100);

    // make sure we don't have any dark mode class
    this._$iframe?.contentDocument?.body.classList.remove('-dark');

    // register the deamon into the iframe
    __CarpenterDaemonElement.define('s-carpenter-daemon', null, {
      // window: this._$iframe?.contentWindow,
    });

    // empty page
    document
      .querySelectorAll(
        `body > *:not(${this.tagName}):not(s-factory):not(.${this.cls(
          '_canvas',
        )}):not(script):not(${this.cls('_canvas')
          .map((c) => `.${c}`)
          .join(',')}`,
      )
      .forEach(($el) => {
        $el.remove();
      });
  }

  private _setIframeContent(html: string): void {
    if (!this._$iframe?.contentDocument) {
      return;
    }
    __injectHtml(this._$iframe.contentDocument.body, html);

    // @TODO    find a better way to resize the iframe correctly
    setTimeout(this._updateIframeSize.bind(this), 50);
    setTimeout(this._updateIframeSize.bind(this), 100);
    setTimeout(this._updateIframeSize.bind(this), 200);
  }

  private _updateIframeSize(): void {
    this._$iframe?.dispatchEvent(
      new CustomEvent('load', {
        bubbles: true,
        cancelable: false,
      }),
    );
  }

  // public selectMediaQuery(name: string): void {
  //   this._currentMediaQuery = name;
  // }

  private async _applyUpdate(update: TCarpenterUpdatePayload): Promise<void> {
    console.log('apply update', update);
    // do nothing if no component is set
    if (!this.selectedComponent) {
      return;
    }

    // set the value into the component

    console.log('update.path', update.path, update.value);

    __set(this.selectedComponent.values, update.path, update.value);

    console.log('selectedComponent', this.selectedComponent);

    // create the update object
    const updateObject: TCarpenterUpdateObject = {
      ...update,
      component: __clone(this.selectedComponent),
    };

    console.log('updateObject', updateObject);

    // if an adapter is set, use it to apply the update
    if (
      typeof this.adapter === 'string' &&
      CarpenterElement._adapters[this.adapter]
    ) {
      CarpenterElement._adapters[this.adapter].applyUpdate(updateObject);
    } else if (this.adapter) {
      (<TCarpenterAdapter>this.adapter).applyUpdate(updateObject);
    }

    // dispatch an event
    this.dispatch('update', {
      bubbles: true,
      cancelable: false,
      detail: updateObject,
    });
  }

  // private _renderMediaQueries(): any {
  //   return html`<nav class="${this.cls('_media-queries')}">
  //     <ol class="${this.cls('_media-queries-list')}">
  //       ${Object.entries(this.mediaQueries).map(
  //         ([name, query]) => html`
  //           <li
  //             class="${this.cls('_media-queries-list-item')} ${this
  //               ._currentMediaQuery === name
  //               ? '-active'
  //               : ''}"
  //             @pointerup=${() => {
  //               this._currentMediaQuery = name;
  //             }}
  //           >
  //             <span class="${this.cls('_media-queries-list-item-name')}"
  //               >${query.name}</span
  //             >
  //           </li>
  //         `,
  //       )}
  //     </ol>
  //   </nav>`;
  // }

  // private _renderBottombar(): any {
  //   return html`<nav class="${this.cls('_bottombar')}">
  //     ${this._renderMediaQueries()}
  //   </nav>`;
  // }

  // private _renderNotifications(): any {
  //   if (!this._notifications.length) {
  //     return;
  //   }

  //   return html`
  //     <div class="${this.cls('_notifications')}">
  //       <ul class="${this.cls('_notifications-list')}">
  //         ${this._notifications.map(
  //           (notification) => html`
  //             <li
  //               class="${this.cls('_notifications-item')} ${notification.type
  //                 ? `-${notification.type}`
  //                 : ''}"
  //             >
  //               <span class="${this.cls('_notifications-message')}">
  //                 ${notification.message}
  //               </span>
  //             </li>
  //           `,
  //         )}
  //     </div>
  //   `;
  // }

  private _renderEditor(): any {
    return html`<div class="${this.cls('_editor')}">
      <div class="${this.cls('_editor-inner')}">
        <s-json-schema-form
          id="s-carpenter-json-schema-form"
          .lnf=${this.lnf}
          id="s-carpenter-json-schema-form"
          name="s-carpenter-json-schema-form"
          .buttonClasses=${true}
          .formClasses=${true}
          .verbose=${this.verbose}
          .schema=${this.selectedComponent?.schema}
          .values=${this.selectedComponent?.values}
          @s-json-schema-form.update=${(e: CustomEvent) => {
            console.log('update', e.detail);
            this._applyUpdate({
              ...e.detail.update,
            });
          }}
        ></s-json-schema-form>
      </div>
    </div>`;
  }

  public render() {
    return html`
      <s-carpenter-daemon
        .uiMode=${this.uiMode}
        .lnf=${this.lnf}
        @s-carpenter-daemon.component.connect=${(e: CustomEvent) => {
          // add the component to the list
          this._components[e.detail.id] = e.detail;
          // forward the event to the parent
          this.dispatch('component.connect', {
            bubbles: true,
            detail: e.detail,
          });
        }}
        @s-carpenter-daemon.component.disconnect=${(e: CustomEvent) => {
          // remove the component from the list
          delete this._components[e.detail.id];
          // forward the event to the parent
          this.dispatch('component.disconnect', {
            bubbles: true,
            detail: e.detail,
          });
        }}
        @s-carpenter-daemon.select=${(e: CustomEvent) => {
          this.selectedComponent = e.detail;
          this.dispatch('select', {
            bubbles: true,
            detail: e.detail,
          });
        }}
        @s-carpenter-daemon.edit=${(e: CustomEvent) => {
          this.dispatch('edit', {
            bubbles: true,
            detail: e.detail,
          });
        }}
      ></s-carpenter-daemon>
      ${this._renderEditor()}
    `;
  }
}

CarpenterElement.define('s-carpenter');
__IconElement.define('s-icon', {
  type: 'solid',
});
