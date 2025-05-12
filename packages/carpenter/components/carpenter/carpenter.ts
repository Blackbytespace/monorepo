import '@fontsource/poppins';
import '@lotsof/json-schema-form';
import __LitElement from '@lotsof/lit-element';
import { __iframeAutoSize, __injectHtml } from '@lotsof/sugar/dom';
import { __isInIframe } from '@lotsof/sugar/is';
import { type THotkeySettings } from '@lotsof/sugar/keyboard';
import { __set } from '@lotsof/sugar/object';
import { html } from 'lit';
import { property, state } from 'lit/decorators.js';
import '../../components/index.css';
import {
  TCarpenterAdapter,
  TCarpenterComponent,
  TCarpenterMediaQuery,
  TCarpenterNotification,
  TCarpenterState,
  TCarpenterUpdateObject,
  TCarpenterUpdatePayload,
} from './carpenter.type.js';

const __saveComponentValuesSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'saveValues',
  title: 'Save values',
  description: 'Simply save the actual component values to use them later',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: 'Name',
      description: 'Unique name to identify the saved values',
      minLength: 5,
      placeholder: 'Complete with video and slider',
      autofocus: true,
    },
  },
};

export default class CarpenterElement extends __LitElement {
  @property({ type: Object })
  public mediaQueries: Record<string, TCarpenterMediaQuery> = {};

  @property({ type: String })
  public mediaQuery: string = 'desktop';

  @property({ type: Object })
  public adapter?: TCarpenterAdapter | string;

  @property({ type: Object })
  public component?: TCarpenterComponent;

  @property({ type: String })
  public darkModeClass: string = '-dark';

  @property({ type: Function })
  public loaded?: Function;

  @state()
  public _notifications: TCarpenterNotification[] = [];

  @state()
  public _currentMediaQuery: string = '';

  @state()
  public _currentAction: 'saveValues' | null = null;

  @state()
  protected _state: TCarpenterState = {};

  private _$iframe?: HTMLIFrameElement;
  private _$canvas?: HTMLDivElement;

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
    document.body.appendChild($canvas);

    // create the iframe
    const $iframe = document.createElement('iframe');
    $iframe.classList.add(...this.cls('_iframe'));
    __iframeAutoSize($iframe, { width: false, height: true });
    this._$iframe = $iframe;

    // append the iframe to the body
    const iframeLoadedPromise = new Promise((resolve) => {
      $iframe.addEventListener('load', () => {
        this.dispatch('loaded', {
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
        justify-content: center;
        align-items: center;
      }
    `;
    $iframe.contentWindow?.document.head.appendChild($centerStyle);

    // if we have some html provided in the component,
    // set it into the iframe
    setTimeout(() => {
      if (this.component?.html) {
        this._setIframeContent(this.component.html);
      }
    }, 100);

    // make sure we don't have any dark mode class
    this._$iframe?.contentDocument?.body.classList.remove('-dark');

    // remove styles from FactoryElement and CarpenterElement
    // to avoid conflicts with the iframe
    this._$iframe.contentDocument
      ?.querySelectorAll('style')
      .forEach(($style) => {
        const src = $style.getAttribute('data-vite-dev-id');
        if (
          src?.includes('FactoryElement') ||
          src?.includes('CarpenterElement')
        ) {
          $style.remove();
        }
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
    // do nothing if no component is set
    if (!this.component) {
      return;
    }

    // set the value into the component
    __set(this.component.values, update.path, update.value);

    // create the update object
    const updateObject: TCarpenterUpdateObject = {
      ...update,
      component: this.component,
    };

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
    if (!this.component) {
      return;
    }

    return html`<div class="${this.cls('_editor')}">
      <div class="${this.cls('_editor-inner')}">
        <s-json-schema-form
          id="s-carpenter-json-schema-form"
          @s-json-schema-form.update=${(e: CustomEvent) => {
            this._applyUpdate({
              ...e.detail.update,
            });
          }}
          id="s-carpenter-json-schema-form"
          name="s-carpenter-json-schema-form"
          .buttonClasses=${true}
          .formClasses=${true}
          .verbose=${this.verbose}
          .schema=${this.component.schema}
          .values=${this.component.values ?? {}}
        ></s-json-schema-form>
      </div>
    </div>`;
  }

  public render() {
    return html` ${this._renderEditor()}`;
  }
}

CarpenterElement.define('s-carpenter');
