import __LitElement from '@lotsof/litElement';

// @todo    check why is a problem importing this functions
// @ts-ignore
import { __isInIframe } from '@lotsof/sugar/is';

import { __injectHtml } from '@lotsof/sugar/dom';

import { html } from 'lit';
import { property, state } from 'lit/decorators.js';

import '../../src/css/FactoryElement.css';
import { IFactoryComponent, IFactorySpecs } from '../shared/factory.types.js';

export default class FactoryElement extends __LitElement {
  @property({ type: String })
  public src: string = '/api/specs';

  @state()
  // @ts-ignore
  public specs: IFactorySpecs = {};

  @state()
  public _currentComponent: IFactoryComponent | null = null;

  @state()
  public _currentComponentId: string = '';

  private _$iframe?: HTMLIFrameElement;

  constructor() {
    super();
  }

  /**
   * @name      isDaemon
   * @type      Boolean
   * @get
   *
   * Return true if the component runs into the iframe (in deamon mode)
   *
   * @since     1.0.0
   */
  public get isDaemon(): boolean {
    return __isInIframe();
  }

  public get currentEngine(): string | undefined {
    if (!this.currentComponentId) {
      return;
    }

    const matches = document.location.pathname.match(
      /^\/component\/[a-zA-Z0-9_-]+\/([^\/]+)/,
    );

    return matches?.[1];
  }

  public get currentComponentId(): string | undefined {
    const matches = document.location.pathname.match(/^\/component\/([^\/]+)/);

    return matches?.[1];
  }

  private async _fetchSpecs(): Promise<void> {
    const request = await fetch(this.src),
      json = await request.json();

    this.specs = json;
  }

  public get $iframeDocument(): Document | null | undefined {
    return this._$iframe?.contentDocument;
  }

  async mount() {
    // if not in an iframe, init the environment
    // by creating an iframe and load the factory deamon
    // inside it
    if (this.isDaemon) {
      return;
    }

    // fetch the specs
    await this._fetchSpecs();

    // load the environment by
    // creating the iframe etc...
    await this._initEnvironment();

    // init the listeners like escape key, etc...
    this._initListeners(document);
    // this._initListeners(this.$iframeDocument as Document);

    // render component if the current component is set
    if (this.currentComponentId) {
      this._renderComponentInIframe(this.currentComponentId);
    }
  }

  private _initListeners(context: Document): void {
    // popstate
    window.addEventListener('popstate', (e) => {
      if (e.state.id) {
        this._currentComponentId = e.state.id;
      }
    });

    // escape key
    context.addEventListener('keyup', (e) => {
      switch (true) {
        case e.key === 'Escape':
          break;
      }
    });
  }

  public registerComponent(component: IFactoryComponent): void {
    this.log(`Registering the component (${component.name})[#${component.id}]`);
    // this._specs.components[component.id] = component;
  }

  private _initEnvironment(): void {
    this.log(`Init the factory environment...`);
    // move the component into the body
    document.body.appendChild(this);

    // create the iframe
    const $iframe = document.createElement('iframe');
    $iframe.classList.add(this.cls('_iframe'));
    this._$iframe = $iframe;

    // append the iframe to the body
    document.body.prepend($iframe);

    // copy the document into the iframe
    $iframe?.contentWindow?.document.open();
    $iframe?.contentWindow?.document.write(document.documentElement.outerHTML);
    $iframe?.contentWindow?.document.close();

    this.$iframeDocument?.querySelector(`.${this.cls('_iframe')}`)?.remove();
    this.$iframeDocument?.querySelector(this.tagName)?.remove();

    // inject the actual website assets into the iframe
    for (let [key, value] of Object.entries(
      this.specs?.config?.project?.assets ?? {},
    )) {
      switch (true) {
        case value.includes('.js') || value.includes('.ts'):
          const $script = this._$iframe?.contentDocument?.createElement(
            'script',
          ) as HTMLScriptElement;
          $script.src = value;
          $script?.setAttribute('type', 'module');
          this._$iframe?.contentDocument?.head.appendChild($script);
          break;
        case value.includes('.css'):
          const $link = this._$iframe?.contentDocument?.createElement(
            'link',
          ) as HTMLLinkElement;
          $link.href = value;
          $link.rel = 'stylesheet';
          this._$iframe?.contentDocument?.head.appendChild($link);
          break;
      }
    }

    // empty page
    document
      .querySelectorAll(`body > *:not(${this.tagName}):not(script):not(iframe)`)
      .forEach(($el) => {
        $el.remove();
      });

    // inject the factory deamon
    this._injectFactoryDeamon();
  }

  private _setIframeContent(html: string): void {
    if (!this._$iframe?.contentDocument?.body) {
      return;
    }

    __injectHtml(this._$iframe.contentDocument.body, html);
  }

  private _injectFactoryDeamon(): void {
    const $deamon = this._$iframe?.contentDocument?.createElement(
      's-factoryd',
    ) as HTMLElement;
    $deamon.setAttribute('id', 's-factoryd');
    $deamon.setAttribute('verbose', this.verbose ? 'true' : 'false');

    $deamon.addEventListener('factory.component', (e) => {
      this.registerComponent((<CustomEvent>e).detail as IFactoryComponent);
    });
    $deamon.addEventListener('factory.edit', (e) => {
      //   this._currentComponent = (<CustomEvent>e).detail;
      this.requestUpdate();
    });

    this._$iframe?.contentDocument?.body.appendChild($deamon);
  }

  private async _applyUpdate(update: IFactoryComponent): Promise<void> {
    // if (!this.adapter) {
    //   this.log(
    //     `No adapter defined to handle update of ${update.path.join('.')}...`,
    //     update.value,
    //   );
    //   return;
    // }

    // make the update throug the specified adapter
    // const response = await this.adapter.applyUpdate(update);

    // if the component has been totally updated
    // we need to refresh his reference
    // if (!update.component.$component.parentElement) {
    //   update.component.$component = this.$iframeDocument?.querySelector(
    //     `#${update.component.id}`,
    //   ) as HTMLElement;
    // }

    // update the component
    this.requestUpdate();
  }

  private async _renderComponentInIframe(
    id: string,
    engine?: string,
  ): Promise<void> {
    let url = `/api/render/${id}`;
    if (engine) {
      url += `/${engine}`;
    }

    const request = await fetch(url),
      html = await request.text();

    this._setIframeContent(html);
  }

  public selectComponent(id: string, engine?: string): void {
    // compose the url
    let url = `/component/${id}`;
    if (engine) {
      url += `/${engine}`;
    }
    // maintain the history
    history.pushState({ id, engine }, '', url);
    // set the current component
    this._currentComponentId = id;
    // render the new component
    this._renderComponentInIframe(id, engine);
    // update the factory
    this.requestUpdate();
  }

  private _renderComponents(): any {
    return html`
      ${this.specs.components
        ? html`
            <nav class=${this.cls('_components')}>
              <ol class="${this.cls('_components-list')}">
                ${Object.entries(this.specs.components).map(
                  ([id, component]) => html`
                    <li
                      class="${this.cls('_components-list-item')} ${this
                        .currentComponentId === id
                        ? '-active'
                        : ''}"
                    >
                      <span
                        class="${this.cls('_components-list-item-name')}"
                        @pointerup=${(e) => {
                          this.selectComponent(id);
                        }}
                      >
                        ${component.name}
                      </span>
                      <ol class="${this.cls('_components-list-item-engines')}">
                        ${component.engines.map(
                          (engine) => html`
                            <li
                              class="${this.cls(
                                '_components-list-item-engine',
                              )} ${this.currentEngine === engine
                                ? '-active'
                                : ''}"
                              @pointerup=${(e) => {
                                this.selectComponent(id, engine);
                              }}
                            >
                              ${engine}
                            </li>
                          `,
                        )}
                      </ol>
                    </li>
                  `,
                )}
              </ol>
            </nav>
          `
        : ''}
    `;
  }

  private _renderSidebar(): any {
    return html`<nav class="${this.cls('_sidebar')}">
      ${this._renderComponents()}
    </nav>`;
  }

  public render() {
    return html` ${this._renderSidebar()} `;
  }
}

FactoryElement.define('s-factory', FactoryElement);
