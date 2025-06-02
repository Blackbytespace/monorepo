import '@fontsource/poppins';
import __AdvancedSelectElement, {
  TAdvancedSelectElementItem,
  TAdvancedSelectElementItemsFunctionApi,
} from '@lotsof/advanced-select-element';
import '@lotsof/carpenter';
// @ts-ignore
import { __CarpenterElement } from '@lotsof/carpenter';
import { __i18n } from '@lotsof/i18n';
import '@lotsof/json-schema-form';
import __LitElement from '@lotsof/lit-element';
import { __getFormValues } from '@lotsof/sugar/dom';
import { __isInIframe } from '@lotsof/sugar/is';
import {
  __escapeQueueLength,
  __hotkey,
  type THotkeySettings,
} from '@lotsof/sugar/keyboard';
import { __clone } from '@lotsof/sugar/object';
import { __uniqid, __upperFirst } from '@lotsof/sugar/string';
import { html, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../../src/css/output/factory.build.css';
import {
  TFactoryComponent,
  TFactoryNotification,
  TFactorySpecs,
  TFactoryState,
  TFactoryUpdateComponentSettings,
} from '../shared/factory.type.js';
import __logoFactory from './assets/logoFactory.js';
import __logos from './assets/logos.js';

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

export default class FactoryElement extends __LitElement {
  @property({ type: String })
  public src: string = '/api/specs';

  @property({ type: String })
  public commandPanelHotkey: string = 'cmd+p';

  @property({ type: String })
  public darkModeClass: string = '-dark';

  @state()
  // @ts-ignore
  public specs: TFactorySpecs = {};

  @state()
  public _notifications: TFactoryNotification[] = [];

  @state()
  public _selectedComponent: TFactoryComponent | null = null;

  @state()
  public _selectedComponentId: string | undefined;

  @state()
  public _preselectedComponentId: string | undefined;

  @state()
  public _components: Record<string, TFactoryComponent> = {};

  @state()
  public _currentAction: 'saveValues' | null = null;

  @state()
  public _showEditor: boolean = false;

  @state()
  protected _state: TFactoryState = {};

  private _$commandPanelSelect: __AdvancedSelectElement | null = null;
  private _$carpenter: __CarpenterElement | null = null;

  constructor() {
    super('s-factory');
    this.saveState = true;
  }

  public get currentEngine(): string | undefined {
    // getted from query string
    if (!document.location.search) {
      return;
    }

    // get the params from the query string
    const params = new URLSearchParams(document.location.search);

    // return the engine
    return params.get('engine') || undefined;
  }

  public get selectedComponent(): TFactoryComponent {
    return this._components[this.selectedComponentId as string];
  }

  public get selectedComponentId(): string | undefined {
    return this._selectedComponentId;
  }

  public get preselectedComponent(): TFactoryComponent | null {
    return this._components[this.preselectedComponentId as string];
  }

  public get preselectedComponentId(): string | undefined {
    return this._preselectedComponentId;
  }

  public get componentsToRender(): string[] | undefined {
    // getted from the url
    const matches = document.location.pathname.match(/^\/component\/([^\?]+)/);
    return matches?.[1]?.split('+');
  }

  public showEditor(): void {
    this._showEditor = true;
    document.body.classList.add('-show-editor');
  }

  public hideUi(): void {
    this._showEditor = false;
    document.body.classList.remove('-show-editor');
  }

  private async _fetchSpecs(): Promise<void> {
    // fetch the specs from the server
    const request = await fetch(this.src),
      json = await request.json();
    // set the specs
    this.specs = json;
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    // save the carpenter reference
    this._$carpenter = this.querySelector('s-carpenter');
  }

  async mount() {
    // if not in an iframe, init the environment
    // by creating an iframe and load the factory deamon
    // inside it
    if (__isInIframe()) {
      return;
    }

    // fetch the specs
    await this._fetchSpecs();

    // load the environment by
    // creating the iframe etc...
    await this._initEnvironment();

    // init the listeners like escape key, etc...
    this._initListeners(document);

    // init command panel
    this._initCommandPanel();

    // restore the ui mode (light/dark)
    this._restoreUiMode();
  }

  private _initCommandPanel(): void {
    __AdvancedSelectElement.define('s-factory-command-panel-select', {
      activeWhen: [],
      items: (api: TAdvancedSelectElementItemsFunctionApi) => {
        switch (true) {
          case api.search?.startsWith('/'):
            const items: Partial<TAdvancedSelectElementItem>[] = [];

            for (const [id, component] of Object.entries(
              this.specs.components,
            )) {
              for (let engine of component.engines) {
                items.push({
                  id: `/${id}/${engine}`,
                  value: `/${id}/${engine}`,
                  label: `<div class="${this.cls('_command-panel-component')}">
                        <h3 class="${this.cls(
                          '_command-panel-component-name',
                        )}">${__upperFirst(component.name)}</span>
                        <h4 class="${this.cls(
                          '_command-panel-component-engine',
                        )}">${engine}</h4>
                        ${__logos[engine] || ''}
                      </div>`,
                  preventSet: true,
                  engine,
                });
              }
            }

            return items;
            break;
          // case api.search?.startsWith('@'):
          //   return Object.entries(this.mediaQueries).map(([name, query]) => {
          //     return {
          //       id: `@${name}`,
          //       value: `@${name}`,
          //       preventSet: true,
          //       label: `${__upperFirst(query.name)} - ${query.min}px - ${
          //         query.max
          //       }px`,
          //     };
          //   });

          //   break;
          case api.search?.startsWith('!'):
            return Object.entries(this.selectedComponent.engines).map(
              ([idx, name]) => {
                return {
                  id: `!${this.selectedComponent.id}`,
                  value: `!${this.selectedComponent.id}`,
                  preventSet: true,
                  label: `${__upperFirst(name as string)}`,
                  engine: name,
                };
              },
            );

            break;
          case api.search?.startsWith('<'):
            return Object.entries(this.selectedComponent.savedValues).map(
              ([key, savedData]) => {
                return {
                  id: `<${key}`,
                  value: `<${key}`,
                  preventSet: true,
                  label: (<any>savedData).name,
                };
              },
            );
            break;
          default:
            return [
              {
                id: '/',
                value: '/',
                preventClose: true,
                preventSelect: true,
                label: `<span class="s-factory-command-panel_prefix"
                      >/</span
                    >${__i18n('Components')}`,
              },
              {
                id: '!',
                value: '!',
                preventClose: true,
                preventSelect: true,
                label: `<span class="s-factory-command-panel_prefix"
                      >!</span
                    >${__i18n('Switch engine')}`,
              },
              // {
              //   id: '@',
              //   value: '@',
              //   preventClose: true,
              //   preventSelect: true,
              //   label: `<span class="s-factory-command-panel_prefix"
              //         >@</span
              //       >${__i18n('Media queries')}`,
              // },
              // {
              //   id: '<',
              //   value: '<',
              //   preventClose: true,
              //   preventSelect: true,
              //   label: `<span class="s-factory-command-panel_prefix"
              //         >&lt;</span
              //       >${__i18n('Load values')}`,
              // },
              // {
              //   id: '>',
              //   value: '>',
              //   label: `<span class="s-factory-command-panel_prefix"
              //         >&gt;</span
              //       >${__i18n('Save values')}`,
              // },
            ];

            break;
        }
      },
    });
    setTimeout(() => {
      this._$commandPanelSelect = this.querySelector(
        's-factory-command-panel-select',
      ) as __AdvancedSelectElement;
    });
  }

  private _initListeners(context: Document): void {
    // // popstate
    // window.addEventListener('popstate', (e) => {
    //   if (e.state.id) {
    //     this._selectedComponentId = e.state.id;
    //   }
    // });

    // show/hide UI
    context.addEventListener('keydown', (e) => {
      switch (true) {
        case e.key === '§':
          document.body.classList.add('-show-ui');
          break;
      }
    });
    context.addEventListener('keyup', (e) => {
      switch (true) {
        case e.key === '§':
          // do not hide ui if it was shown with the `showEditor` method
          if (this._showEditor) {
            return;
          }

          //
          document.body.classList.remove('-show-ui');
          e.preventDefault();
          (<any>document.activeElement)?.blur();
          break;
      }
    });

    const hotkeySettings: Partial<THotkeySettings> = {
      ctx: context,
    };
    __hotkey(
      'escape',
      (e) => {
        this._currentAction = null;
        const escapeQueueLength = __escapeQueueLength();
        if (escapeQueueLength === 0) {
          this.hideUi();
        }
      },
      hotkeySettings,
    );
    __hotkey(
      'cmd+shift+p',
      (e) => {
        this._$commandPanelSelect?.setSearch('');
        this._$commandPanelSelect?.focus();
      },
      hotkeySettings,
    );

    __hotkey(
      'cmd+p',
      (e) => {
        console.log('cmd+p', this._$commandPanelSelect);
        this._$commandPanelSelect?.setSearch('/');
        this._$commandPanelSelect?.focus();
      },
      hotkeySettings,
    );
    // __hotkey(
    //   'cmd+g',
    //   (e) => {
    //     this._$commandPanelSelect?.setSearch('@');
    //     this._$commandPanelSelect?.focus();
    //   },
    //   hotkeySettings,
    // );
    __hotkey(
      'cmd+e',
      (e) => {
        this._$commandPanelSelect?.setSearch('!');
        this._$commandPanelSelect?.focus();
      },
      hotkeySettings,
    );
    // __hotkey(
    //   'cmd+l',
    //   (e) => {
    //     this._$commandPanelSelect?.setSearch('<');
    //     this._$commandPanelSelect?.focus();
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
    __hotkey(
      'cmd+r',
      (e) => {
        this.randomizeComponentValues(this.selectedComponentId as string);
      },
      hotkeySettings,
    );
    __hotkey(
      'cmd+m',
      (e) => {
        this.toggleUiMode();
      },
      hotkeySettings,
    );
  }

  private _initEnvironment(): void {
    this.log(`Init the factory environment...`);
    // move the component into the body
    document.body.appendChild(this);
  }

  private _initComponents(): void {
    // loop on all the components to render
    this.componentsToRender?.forEach((path) => {
      this._postComponent(path);
    });

    // set the current component to be the first one
    this._selectedComponentId = Object.keys(this._components)[0];
  }

  private async _postComponent(
    pathOrId: string | undefined = this.selectedComponentId,
    settings: TFactoryUpdateComponentSettings = {},
  ): Promise<void> {
    const finalSettings = {
      $iframe: this._$carpenter?.$iframe,
      ...settings,
    };

    // get the component from the specs
    // or from the components list
    // if we have an id, we get the component from the list
    // @ts-ignore
    const component = this.getComponent(pathOrId as string);

    // if we don't have a component, we can't update it
    if (!component) {
      return;
    }

    // make ajax request to the server
    // to render the component
    let url = `/api/render/${component.relPath}`;
    if (finalSettings.engine) {
      url += `?engine=${finalSettings.engine}`;
    } else if (
      this.currentEngine &&
      component.engines.includes(this.currentEngine)
    ) {
      url += `?engine=${this.currentEngine}`;
    } else {
      url += `?engine=${component.engines[0]}`;
    }

    // fetch the component from the server
    // with the new values
    const formData = new FormData();
    formData.append('values', JSON.stringify(component.values));
    formData.append('id', component.id);
    const request = await fetch(url, {
        method: 'POST',
        body: formData,
      }),
      json = await request.json();

    // updading the component values
    component.values = json.values;

    // handling assets
    if (json.assets) {
      for (let asset of json.assets) {
        const $asset = new DOMParser().parseFromString(asset, 'text/html').head
          .firstChild as HTMLElement;

        if (!$asset) {
          continue;
        }

        const id = $asset.getAttribute('id');
        if (finalSettings.$iframe?.querySelector(`#${id}`)) {
          // already exists, continue
          continue;
        }

        // add the asset to the iframe
        finalSettings.$iframe?.contentDocument.head.appendChild($asset);
      }
    }

    // update the iframe with new component html
    if (finalSettings.$iframe) {
      let $componentInIframe: HTMLElement =
        finalSettings.$iframe.contentDocument?.querySelector(
          `#${component.id}`,
        );

      const newComponentDom = new DOMParser().parseFromString(
        json.html,
        'text/html',
      );

      const $newComponent = newComponentDom.querySelector(
        `#${component.id}`,
      ) as HTMLElement;

      if (!$componentInIframe) {
        // add the new component in the iframe
        finalSettings.$iframe.contentDocument.body.appendChild($newComponent);

        // get the component in the iframe
        $componentInIframe =
          finalSettings.$iframe.contentDocument.querySelector(
            `#${component.id}`,
          ) as HTMLElement;
      } else {
        // update the component in the iframe
        $componentInIframe.innerHTML = $newComponent.innerHTML;
      }

      // make sure the scripts are executed
      Array.from($componentInIframe.querySelectorAll('script')).forEach(
        (oldScriptEl: HTMLElement) => {
          const newScriptEl = document.createElement('script');

          Array.from(oldScriptEl.attributes).forEach((attr) => {
            newScriptEl.setAttribute(attr.name, attr.value);
          });

          const scriptText = document.createTextNode(oldScriptEl.innerHTML);
          newScriptEl.appendChild(scriptText);

          oldScriptEl.parentNode?.replaceChild(newScriptEl, oldScriptEl);
        },
      );
    }

    // update Factory AND Carpenter
    this._$carpenter?.requestUpdate();
    this.requestUpdate();
  }

  public setComponent(pathOrId: string, newComponent: TFactoryComponent): void {
    const component = this.getComponent(pathOrId);
    this._components[component.id] = newComponent;
  }

  public getComponent(pathOrId: string): TFactoryComponent {
    if (this._components[pathOrId]) {
      return this._components[pathOrId];
    }
    if (this.specs.components[pathOrId]) {
      const component = __clone(this.specs.components[pathOrId]);
      component.id = 's-component-' + __uniqid();
      this._components[component.id] = component;
      return component;
    }
    throw new Error(`Component ${pathOrId} not found`);
  }

  public selectComponent(id: string, engine?: string): void {
    // compose the url
    let url = `/component/${id}`;
    if (engine) {
      url += `?engine=${engine}`;
    }
    // maintain the history
    history.pushState({ id, engine }, '', url);
    // set the current component
    this._selectedComponentId = id;
    // render the new component
    this._postComponent();
  }

  // public setComponentValues(id: string, values: any): void {
  //   const component = this.getComponent(id);
  //   if (!component) {
  //     return;
  //   }
  //   component.values = values;
  //   this._postComponent(component.name);
  // }

  public toggleUiMode(): void {
    this.setUiMode(this.state.mode === 'dark' ? 'light' : 'dark');
  }

  private _restoreUiMode(): void {
    if (this.state.mode) {
      this.setUiMode(this.state.mode);
    }
  }

  public setUiMode(mode: 'light' | 'dark'): void {
    this.setState({ mode });
    if (mode === 'light') {
      document.body.classList.remove('-dark');
    } else {
      document.body.classList.add('-dark');
    }
  }

  public randomizeComponentValues(
    id: string | undefined = this.selectedComponentId,
  ): void {
    if (!id) {
      return;
    }

    const component = this.getComponent(id);
    if (!component) {
      return;
    }
    // update the component with empty values
    component.values = {};
    // this._postComponent({
    //   id,
    // });
  }

  private async _saveComponentValues(
    component: TFactoryComponent,
    name: String,
  ): Promise<void> {
    // post the new values to the server
    const request = await fetch(`/api/saveValues/${component.name}`, {
        method: 'POST',
        body: JSON.stringify({
          id: component.id,
          name,
          values: component.values,
        }),
      }),
      json = await request.json();

    if (json.errors) {
      console.error(json.errors);
      return;
    }

    // update specs
    await this._fetchSpecs();

    // remove the popin
    this._currentAction = null;

    // @TODO   send a notification
    this._sendNotification({
      id: 'valuesSaved',
      message: `Values saved as ${name}`,
      type: 'success',
      timeout: 2000,
    });
  }

  private _handleCommandPanelSelect(item: TAdvancedSelectElementItem): void {
    let engine: string, id: string;

    switch (true) {
      case item.value.startsWith('/'):
      case item.value.startsWith('!'):
        [id, engine] = item.value.slice(1).split('/');

        console.log('select', item);

        // this.selectComponent(id, engine);
        break;
      case item.value.startsWith('@'):
        const mediaQuery = item.value.slice(1);

        // this.selectMediaQuery(mediaQuery);
        break;
      case item.value.startsWith('>'):
        this._currentAction = 'saveValues';
        break;
      case item.value.startsWith('<'):
        // this.setComponentValues(
        //   this.selectedComponent.name,
        //   this.selectedComponent.savedValues[item.value.slice(1)]?.values,
        // );
        break;
    }
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
                        .selectedComponentId === id
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
                              ${unsafeHTML(__logos[engine] || engine)}
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

  private async _sendNotification(
    notification: TFactoryNotification,
  ): Promise<void> {
    this._notifications.push(notification);
    if (notification.timeout) {
      setTimeout(() => {
        this._notifications = this._notifications.filter(
          (n) => n !== notification,
        );
      }, notification.timeout);
    }
  }

  private _renderSidebar(): any {
    return html`<nav class="${this.cls('_sidebar')}">
      <div class="${this.cls('_sidebar-inner')}">
        ${this._renderComponents()}
      </div>
    </nav>`;
  }

  private _renderTopbar(): any {
    return html`<nav class="${this.cls('_topbar')}">
      <h1 class="${this.cls('_topbar-title')}">${__logoFactory}</h1>
      ${this.selectedComponent
        ? html`<div class="${this.cls('_topbar-component')}">
            <h2 class="${this.cls('_topbar-component-name')}">
              ${__upperFirst(this.selectedComponent.name)}
            </h2>
            <p class="${this.cls('_topbar-component-version')}">
              ${this.selectedComponent.version}
            </p>
            <p class="${this.cls('_topbar-component-engine')}">
              ${__upperFirst(this.currentEngine as string)}
              ${unsafeHTML(
                __logos[this.currentEngine as string] || this.currentEngine,
              )}
            </p>
          </div>`
        : ''}
    </nav>`;
  }

  private _renderMode(): any {
    return html`
      <button
        class="${this.cls('_bottombar-mode')} ${this.state.mode === 'dark'
          ? '-active'
          : ''}"
        @pointerup=${() => {
          this.toggleUiMode();
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
          <path
            d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"
          />
        </svg>
      </button>
    `;
  }

  private _renderCommandPanel(): any {
    return html`<nav class="${this.cls('_command-panel')}">
      <s-factory-command-panel-select
        .verbose=${this.verbose}
        id="s-factory-command-panel"
        mountWhen="direct"
        hotkey=${this.commandPanelHotkey}
        @s-factory-command-panel-select.select=${(e) => {
          this._handleCommandPanelSelect(e.detail.item);
        }}
      >
        <input
          type="text"
          class="form-input"
          placeholder=${__i18n(`Command panel (${this.commandPanelHotkey})`)}
        />
      </s-factory-command-panel-select>
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

  private _renderSaveValuesForm(): any {
    return html`
      <div class="popin">
        <form
          class="${this.cls('_save-values-form')} form"
          @submit=${(e) => {
            e.preventDefault();

            // make sure form is valid
            if (!e.target.checkValidity()) {
              return;
            }

            // save the values
            const formValues = __getFormValues(e.target);
            this._saveComponentValues(this.selectedComponent, formValues.name);
          }}
        >
          <s-json-schema-form
            id="s-factory-save-values-form"
            .formClasses=${true}
            .schema=${__saveComponentValuesSchema}
            .values=${{}}
          ></s-json-schema-form>
          <code class="${this.cls('_save-values-form-code')}">
            ${JSON.stringify(this.selectedComponent?.values, null, 2)}
          </code>
          <input
            type="submit"
            class="button -full"
            value=${__i18n('Save values')}
          />
        </form>
      </div>
    `;
  }

  private _renderEditor(): any {
    return html`
      <div class="${this.cls('_editor')}">
        <div class="${this.cls('_editor-inner')}">
          <s-carpenter
            .lnf=${this.lnf}
            .uiMode=${this.state.mode}
            .verbose=${this.verbose}
            @s-carpenter.update=${(e) => {
              this.setComponent(e.detail.component.id, e.detail.component);
              this._postComponent(e.detail.id);
            }}
            @s-carpenter.ready=${(e) => {
              setTimeout(() => {
                this._initListeners(
                  (<any>e.detail.$iframe)?.contentDocument as Document,
                );
              });
              this._initComponents();
            }}
            @s-carpenter.component.connect=${(e) => {
              if (!e.details?.id) {
                return;
              }
              // add the component to the list
              this._components[e.detail.id] = e.detail;
            }}
            @s-carpenter.component.disconnect=${(e) => {
              if (!e.details?.id) {
                return;
              }
              // add the component to the list
              delete this._components[e.detail.id];
            }}
            @s-carpenter.preselect=${(e) => {
              if (!e.detail?.id || !this._components[e.detail.id]) {
                return;
              }
              // set the preselected component id
              this._preselectedComponentId = e.detail.id;
            }}
            @s-carpenter.select=${(e) => {
              if (!e.detail?.id || !this._components[e.detail.id]) {
                return;
              }
              // set the selected component id
              this._selectedComponentId = e.detail.id;
            }}
            @s-carpenter.edit=${(e) => {
              // if (!e.detail?.id || !this._components[e.detail.id]) {
              //   return;
              // }
              this.showEditor();
              // set the selected component id
              this._selectedComponentId = e.detail.id;
            }}
          />
        </div>
      </div>
    `;
  }

  public render() {
    return html`
      ${this._renderTopbar()} ${this._renderCommandPanel()}
      ${this._renderEditor()}
      ${this._currentAction === 'saveValues'
        ? this._renderSaveValuesForm()
        : ''}
      ${this._renderNotifications()}
    `;
  }
}

FactoryElement.define('s-factory');
