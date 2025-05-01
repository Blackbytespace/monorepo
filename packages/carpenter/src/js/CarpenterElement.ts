import '@fontsource/poppins';
import '@lotsof/json-schema-form';
import __LitElement from '@lotsof/lit-element';
import { __iframeAutoSize, __injectHtml } from '@lotsof/sugar/dom';
import { __isInIframe } from '@lotsof/sugar/is';
import { __hotkey, type THotkeySettings } from '@lotsof/sugar/keyboard';
import { html } from 'lit';
import { property, state } from 'lit/decorators.js';
import '../../src/css/CarpenterElement.css';
import {
  TCarpenterComponent,
  TCarpenterMediaQuery,
  TCarpenterNotification,
  TCarpenterState,
} from '../shared/carpenter.types.js';

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
  public component?: TCarpenterComponent;

  @property({ type: String })
  public darkModeClass: string = '-dark';

  @state()
  public _notifications: TCarpenterNotification[] = [];

  @state()
  public _currentComponent: TCarpenterComponent | null = null;

  @state()
  public _currentComponentId: string = '';

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

  private _updateMediaQueries(): void {
    // get the computed style of the document (iframe)
    const style = this._$iframe?.contentWindow?.getComputedStyle(
      this.$iframeDocument?.body as Element,
    );

    // try to get the media queries from the css variables (sugarcss)
    ['mobile', 'tablet', 'desktop', 'wide'].forEach((media) => {
      const min = parseInt(
          style?.getPropertyValue(`--s-media-${media}-min`) ?? '0',
        ),
        max = parseInt(
          style?.getPropertyValue(`--s-media-${media}-max`) ?? '0',
        );

      if (min || max) {
        const query: TCarpenterMediaQuery = {
          name: media,
          min: min ? min : -1,
          max: max ? max : -1,
        };
        this.mediaQueries[media] = query;
      }
    });

    // init the media query if not set
    if (
      !this._currentMediaQuery &&
      Object.keys(this.mediaQueries ?? {}).length
    ) {
      this._currentMediaQuery = Object.keys(this.mediaQueries)[0];
    }

    // make sure we update the UI
    this.requestUpdate();
  }

  public get $iframeDocument(): Document | null | undefined {
    return this._$iframe?.contentDocument;
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
    __hotkey(
      'escape',
      (e) => {
        this._currentAction = null;
      },
      hotkeySettings,
    );
    __hotkey(
      'cmd+s',
      (e) => {
        this._currentAction = 'saveValues';
      },
      hotkeySettings,
    );
  }

  private _initEnvironment(): void {
    this.log(`Init the carpenter environment...`);
    // move the component into the body
    // document.body.appendChild(this);

    // create the canvas
    const $canvas = document.createElement('div');
    $canvas.classList.add(...this.cls('_canvas'));
    this.appendChild($canvas);

    // create the iframe
    const $iframe = document.createElement('iframe');
    $iframe.classList.add(...this.cls('_iframe'));
    __iframeAutoSize($iframe, { width: false, height: true });
    this._$iframe = $iframe;

    // listen for the iframe to be loaded
    $iframe.addEventListener('load', () => {
      this._updateMediaQueries();
    });

    // append the iframe to the body
    $canvas.appendChild($iframe);

    // copy the document into the iframe
    $iframe?.contentWindow?.document.open();
    $iframe?.contentWindow?.document.write(document.documentElement.outerHTML);
    $iframe?.contentWindow?.document.close();

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

    // // inject the actual website assets into the iframe
    // for (let [key, value] of Object.entries(
    //   this.specs?.config?.project?.assets ?? {},
    // )) {
    //   switch (true) {
    //     case value.includes('.js') || value.includes('.ts'):
    //       const $script = this._$iframe?.contentDocument?.createElement(
    //         'script',
    //       ) as HTMLScriptElement;
    //       $script.src = value;
    //       $script?.setAttribute('type', 'module');
    //       this._$iframe?.contentDocument?.head.appendChild($script);
    //       break;
    //     case value.includes('.css'):
    //       const $link = this._$iframe?.contentDocument?.createElement(
    //         'link',
    //       ) as HTMLLinkElement;
    //       $link.href = value;
    //       $link.rel = 'stylesheet';
    //       this._$iframe?.contentDocument?.head.appendChild($link);
    //       break;
    //   }
    // }

    // empty page
    document
      .querySelectorAll(
        `body > *:not(${
          this.tagName
        }):not(s-factory):not(script):not(.${this.cls('_canvas')})`,
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

  public selectMediaQuery(name: string): void {
    this._currentMediaQuery = name;
  }

  // private async _applyUpdate(update: TCarpenterUpdateObject): Promise<void> {
  //   // set the value into the component
  //   __set(this.currentComponent?.values, update.path, update.value);

  //   // update the component
  //   this._updateComponent(
  //     this.currentComponentId as string,
  //     this.currentEngine,
  //   );
  // }

  private _renderMediaQueries(): any {
    return html`<nav class="${this.cls('_media-queries')}">
      <ol class="${this.cls('_media-queries-list')}">
        ${Object.entries(this.mediaQueries).map(
          ([name, query]) => html`
            <li
              class="${this.cls('_media-queries-list-item')} ${this
                ._currentMediaQuery === name
                ? '-active'
                : ''}"
              @pointerup=${() => {
                this._currentMediaQuery = name;
              }}
            >
              <span class="${this.cls('_media-queries-list-item-name')}"
                >${query.name}</span
              >
            </li>
          `,
        )}
      </ol>
    </nav>`;
  }

  private _renderBottombar(): any {
    return html`<nav class="${this.cls('_bottombar')}">
      ${this._renderMediaQueries()}
    </nav>`;
  }

  private _renderNotifications(): any {
    if (!this._notifications.length) {
      return;
    }

    return html`
      <div class="${this.cls('_notifications')}">
        <ul class="${this.cls('_notifications-list')}">
          ${this._notifications.map(
            (notification) => html`
              <li
                class="${this.cls('_notifications-item')} ${notification.type
                  ? `-${notification.type}`
                  : ''}"
              >
                <span class="${this.cls('_notifications-message')}">
                  ${notification.message}
                </span>
              </li>
            `,
          )}
      </div>
    `;
  }

  private _renderEditor(): any {
    if (!this.component) {
      return;
    }

    return html`<div class="${this.cls('_editor')}">
      <div class="${this.cls('_editor-inner')}">
        <s-json-schema-form
          id="s-carpenter-json-schema-form"
          @sJsonSchemaForm.update=${(e: CustomEvent) => {
            // this._applyUpdate({
            //   ...e.detail.update,
            //   component: this._currentComponent,
            // });
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
    return html`
      ${this._renderEditor()} ${this._renderBottombar()}
      ${this._renderNotifications()}
    `;
  }
}

CarpenterElement.define('s-carpenter');
