import __AdvancedSelectElement, {
  TAdvancedSelectElementItem,
  TAdvancedSelectElementItemsFunctionApi,
} from '@blackbyte/advanced-select-element';
import '@blackbyte/carpenter';
import '@fontsource/poppins';
// @ts-ignore
import { __Carpenter, __CarpenterElement } from '@blackbyte/carpenter';
import { __i18n } from '@blackbyte/i18n';
import '@blackbyte/json-schema-form';
import __LitElement from '@blackbyte/lit-element';
import { __getFormValues } from '@blackbyte/sugar/dom';
import { __isInIframe } from '@blackbyte/sugar/is';
import {
  __escapeQueueLength,
  __hotkey,
  type THotkeySettings,
} from '@blackbyte/sugar/keyboard';
import { __clone } from '@blackbyte/sugar/object';
import { __uniqid, __upperFirst } from '@blackbyte/sugar/string';
import { html, PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../../src/css/output/factory.build.css';
import {
  TFactoryComponent,
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

  @state()
  // @ts-ignore
  public specs: TFactorySpecs = {};

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

    // request update when something changes
    // in the carpenter "store"
    __Carpenter.addEventListener('update', (e: CustomEvent) => {
      this.requestUpdate();
    });

    __Carpenter.addEventListener('ready', (e) => {
      this._initListeners(__Carpenter.$iframe.contentDocument as Document);
      this._initComponents();
    });

    __Carpenter.addEventListener('edit', (e) => {
      this.showEditor();
    });

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
            return Object.entries(__Carpenter.selectedComponent.engines).map(
              ([idx, name]) => {
                return {
                  id: `!${__Carpenter.selectedComponent.id}`,
                  value: `!${__Carpenter.selectedComponent.id}`,
                  preventSet: true,
                  label: `${__upperFirst(name as string)}`,
                  engine: name,
                };
              },
            );

            break;
          case api.search?.startsWith('<'):
            return Object.entries(
              __Carpenter.selectedComponent.savedValues,
            ).map(([key, savedData]) => {
              return {
                id: `<${key}`,
                value: `<${key}`,
                preventSet: true,
                label: (<any>savedData).name,
              };
            });
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
        console.log('escape', __escapeQueueLength());
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
    // __hotkey(
    //   'cmd+r',
    //   (e) => {
    //     this.randomizeComponentValues(__Carpenter.selectedComponent?.id, as string);
    //   },
    //   hotkeySettings,
    // );
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

    document.querySelectorAll('#factory-css, #factory-js').forEach(($el) => {
      // add the css/js to the iframe
      __Carpenter.$iframe?.contentDocument.head.appendChild(
        $el.cloneNode(true),
      );
    });
  }

  private async _postComponent(
    pathOrId: string | undefined = __Carpenter.selectedComponent?.id,
    settings: TFactoryUpdateComponentSettings = {},
  ): Promise<void> {
    const finalSettings = {
      $iframe: __Carpenter.$iframe,
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

    // handling assets
    if (json.assets) {
      for (let asset of json.assets) {
        const $asset = new DOMParser().parseFromString(asset, 'text/html').head
          .firstChild as HTMLElement;

        if (!$asset) {
          continue;
        }

        const id = $asset.getAttribute('id');
        if (
          finalSettings.$iframe?.contentDocument.querySelector(`#${id}-wrapper`)
        ) {
          // already exists, continue
          continue;
        }

        // add the asset to the iframe
        finalSettings.$iframe?.contentDocument.head.appendChild($asset);
      }
    }

    // if the component is already registered in Carpenter
    // we update it with the new values
    if (__Carpenter.hasComponent(component.id)) {
      __Carpenter.getComponent(component.id).update(json.values);
    } else {
      const newComponentDom = new DOMParser().parseFromString(
        json.html,
        'text/html',
      );

      const $newComponent = document.createElement('div');
      $newComponent.classList.add(...this.cls('_component-wrapper'));
      for (let $child of newComponentDom.body.childNodes) {
        $newComponent.appendChild($child);
      }

      // add the new component in the iframe
      finalSettings.$iframe.contentDocument.body.appendChild($newComponent);

      // make sure the scripts are executed
      Array.from($newComponent.querySelectorAll('script')).forEach(
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
    // render the new component
    this._postComponent();
  }

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

  private _handleCommandPanelSelect(item: TAdvancedSelectElementItem): void {
    let engine: string, id: string;

    switch (true) {
      case item.value.startsWith('/'):
      case item.value.startsWith('!'):
        [id, engine] = item.value.slice(1).split('/');
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
        //   __Carpenter.selectedComponent.name,
        //   __Carpenter.selectedComponent.savedValues[item.value.slice(1)]?.values,
        // );
        break;
    }
  }

  private _renderTopbar(): any {
    return html`<nav class="${this.cls('_topbar')}">
      <h1 class="${this.cls('_topbar-title')}">${__logoFactory}</h1>
      ${__Carpenter.selectedComponent
        ? html`<div class="${this.cls('_topbar-component')}">
            <h2 class="${this.cls('_topbar-component-name')}">
              ${__upperFirst(__Carpenter.selectedComponent.name)}
            </h2>
            <p class="${this.cls('_topbar-component-version')}">
              ${__Carpenter.selectedComponent.version}
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
      <s-carpenter-editor .lnf=${this.lnf} id="s-factory-editor" />
    `;
  }

  public render() {
    if (__isInIframe()) {
      return '';
    }

    return html`
      <s-carpenter
        .lnf=${this.lnf}
        .uiMode=${this.state.mode}
        .verbose=${this.verbose}
        .appendToBody=${false}
        .addInternalName=${true}
        .centerContent=${true}
      ></s-carpenter>

      ${this._renderTopbar()} ${this._renderCommandPanel()}
      ${this._renderEditor()}
      ${this._currentAction === 'saveValues'
        ? this._renderSaveValuesForm()
        : ''}
    `;
  }
}

FactoryElement.define('s-factory');
