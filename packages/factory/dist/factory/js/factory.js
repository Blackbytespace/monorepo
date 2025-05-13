var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import '@fontsource/poppins';
import __AdvancedSelectElement from '@lotsof/advanced-select-element';
import '@lotsof/carpenter';
import { __i18n } from '@lotsof/i18n';
import '@lotsof/json-schema-form';
import __LitElement from '@lotsof/lit-element';
import { __getFormValues } from '@lotsof/sugar/dom';
import { __isInIframe } from '@lotsof/sugar/is';
import { __hotkey } from '@lotsof/sugar/keyboard';
import { __clone } from '@lotsof/sugar/object';
import { __uniqid, __upperFirst } from '@lotsof/sugar/string';
import { html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../../index.css';
import __logoFactory from '../assets/logoFactory.js';
import __logos from '../assets/logos.js';
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
    constructor() {
        super('s-factory');
        this.src = '/api/specs';
        this.commandPanelHotkey = 'cmd+p';
        this.darkModeClass = '-dark';
        this.specs = {};
        this._notifications = [];
        this._currentComponent = null;
        this._components = {};
        this._currentAction = null;
        this._state = {};
        this._$commandPanelSelect = null;
        this.saveState = true;
    }
    get currentEngine() {
        // getted from query string
        if (!document.location.search) {
            return;
        }
        // get the params from the query string
        const params = new URLSearchParams(document.location.search);
        // return the engine
        return params.get('engine') || undefined;
    }
    get currentComponent() {
        console.log('current', this.currentComponentId);
        return this._components[this.currentComponentId];
    }
    get currentComponentId() {
        return this._currentComponentId;
    }
    get componentsToRender() {
        var _a;
        // getted from the url
        const matches = document.location.pathname.match(/^\/component\/([^\?]+)/);
        return (_a = matches === null || matches === void 0 ? void 0 : matches[1]) === null || _a === void 0 ? void 0 : _a.split('+');
    }
    _fetchSpecs() {
        return __awaiter(this, void 0, void 0, function* () {
            // fetch the specs from the server
            const request = yield fetch(this.src), json = yield request.json();
            // set the specs
            this.specs = json;
        });
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            // if not in an iframe, init the environment
            // by creating an iframe and load the factory deamon
            // inside it
            if (__isInIframe()) {
                return;
            }
            // fetch the specs
            yield this._fetchSpecs();
            // load the environment by
            // creating the iframe etc...
            yield this._initEnvironment();
            // init the listeners like escape key, etc...
            this._initListeners(document);
            // this._initListeners(this.$iframeDocument as Document);
            // init command panel
            this._initCommandPanel();
            // restore the ui mode (light/dark)
            this._restoreUiMode();
        });
    }
    _initCommandPanel() {
        __AdvancedSelectElement.define('s-factory-command-panel-select', {
            activeWhen: [],
            items: (api) => {
                var _a, _b, _c;
                switch (true) {
                    case (_a = api.search) === null || _a === void 0 ? void 0 : _a.startsWith('/'):
                        const items = [];
                        for (const [id, component] of Object.entries(this.specs.components)) {
                            for (let engine of component.engines) {
                                items.push({
                                    id: `/${id}/${engine}`,
                                    value: `/${id}/${engine}`,
                                    label: `<div class="${this.cls('_command-panel-component')}">
                        <h3 class="${this.cls('_command-panel-component-name')}">${__upperFirst(component.name)}</span>
                        <h4 class="${this.cls('_command-panel-component-engine')}">${engine}</h4>
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
                    case (_b = api.search) === null || _b === void 0 ? void 0 : _b.startsWith('!'):
                        return Object.entries(this.currentComponent.engines).map(([idx, name]) => {
                            console.log(this.currentComponent);
                            return {
                                id: `!${this.currentComponent.id}`,
                                value: `!${this.currentComponent.id}`,
                                preventSet: true,
                                label: `${__upperFirst(name)}`,
                                engine: name,
                            };
                        });
                        break;
                    case (_c = api.search) === null || _c === void 0 ? void 0 : _c.startsWith('<'):
                        return Object.entries(this.currentComponent.savedValues).map(([key, savedData]) => {
                            return {
                                id: `<${key}`,
                                value: `<${key}`,
                                preventSet: true,
                                label: savedData.name,
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
            this._$commandPanelSelect = this.querySelector('s-factory-command-panel-select');
        });
    }
    _initListeners(context) {
        // // popstate
        // window.addEventListener('popstate', (e) => {
        //   if (e.state.id) {
        //     this._currentComponentId = e.state.id;
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
            var _a;
            switch (true) {
                case e.key === '§':
                    document.body.classList.remove('-show-ui');
                    e.preventDefault();
                    (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.blur();
                    break;
            }
        });
        const hotkeySettings = {
            ctx: context,
        };
        __hotkey('escape', (e) => {
            this._currentAction = null;
        }, hotkeySettings);
        __hotkey('cmd+shift+p', (e) => {
            var _a, _b;
            (_a = this._$commandPanelSelect) === null || _a === void 0 ? void 0 : _a.setSearch('');
            (_b = this._$commandPanelSelect) === null || _b === void 0 ? void 0 : _b.focus();
        }, hotkeySettings);
        __hotkey('cmd+p', (e) => {
            var _a, _b;
            console.log('cmd+p', this._$commandPanelSelect);
            (_a = this._$commandPanelSelect) === null || _a === void 0 ? void 0 : _a.setSearch('/');
            (_b = this._$commandPanelSelect) === null || _b === void 0 ? void 0 : _b.focus();
        }, hotkeySettings);
        // __hotkey(
        //   'cmd+g',
        //   (e) => {
        //     this._$commandPanelSelect?.setSearch('@');
        //     this._$commandPanelSelect?.focus();
        //   },
        //   hotkeySettings,
        // );
        __hotkey('cmd+e', (e) => {
            var _a, _b;
            (_a = this._$commandPanelSelect) === null || _a === void 0 ? void 0 : _a.setSearch('!');
            (_b = this._$commandPanelSelect) === null || _b === void 0 ? void 0 : _b.focus();
        }, hotkeySettings);
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
        __hotkey('cmd+r', (e) => {
            this.randomizeComponentValues(this.currentComponentId);
        }, hotkeySettings);
        __hotkey('cmd+m', (e) => {
            this.toggleUiMode();
        }, hotkeySettings);
    }
    _initEnvironment() {
        this.log(`Init the factory environment...`);
        // move the component into the body
        document.body.appendChild(this);
    }
    _initComponents() {
        var _a;
        // loop on all the components to render
        (_a = this.componentsToRender) === null || _a === void 0 ? void 0 : _a.forEach((path) => {
            this._updateComponent(path);
        });
        // set the current component to be the first one
        this._currentComponentId = Object.keys(this._components)[0];
    }
    _updateComponent() {
        return __awaiter(this, arguments, void 0, function* (pathOrId = this.currentComponentId, settings = {}) {
            var _a;
            const $carpenter = this.querySelector('s-carpenter');
            const finalSettings = Object.assign({ $iframe: $carpenter === null || $carpenter === void 0 ? void 0 : $carpenter.$iframe }, settings);
            // get the component from the specs
            // or from the components list
            // if we have an id, we get the component from the list
            // @ts-ignore
            const component = this.getComponent(pathOrId);
            // if we don't have a component, we can't update it
            if (!component) {
                return;
            }
            // make ajax request to the server
            // to render the component
            let url = `/api/render/${component.relPath}`;
            if (finalSettings.engine) {
                url += `?engine=${finalSettings.engine}`;
            }
            else if (this.currentEngine &&
                component.engines.includes(this.currentEngine)) {
                url += `?engine=${this.currentEngine}`;
            }
            else {
                url += `?engine=${component.engines[0]}`;
            }
            // fetch the component from the server
            // with the new values
            const formData = new FormData();
            formData.append('values', JSON.stringify(component.values));
            formData.append('id', component.id);
            const request = yield fetch(url, {
                method: 'POST',
                body: formData,
            }), json = yield request.json();
            // updading the component values
            component.values = json.values;
            // update the iframe with new component html
            if (finalSettings.$iframe) {
                let $componentInIframe = (_a = finalSettings.$iframe.contentDocument) === null || _a === void 0 ? void 0 : _a.querySelector(`#${component.id}-container`);
                const newComponentDom = new DOMParser().parseFromString(json.html, 'text/html');
                const $newComponent = newComponentDom.querySelector(`#${component.id}-container`);
                if (!$componentInIframe) {
                    // add the new component in the iframe
                    finalSettings.$iframe.contentDocument.body.appendChild($newComponent);
                    // get the component in the iframe
                    $componentInIframe =
                        finalSettings.$iframe.contentDocument.querySelector(`#${component.id}-container`);
                }
                else {
                    // update the component in the iframe
                    $componentInIframe.innerHTML = $newComponent.innerHTML;
                }
                // make sure the scripts are executed
                Array.from($componentInIframe.querySelectorAll('script')).forEach((oldScriptEl) => {
                    var _a;
                    const newScriptEl = document.createElement('script');
                    Array.from(oldScriptEl.attributes).forEach((attr) => {
                        newScriptEl.setAttribute(attr.name, attr.value);
                    });
                    const scriptText = document.createTextNode(oldScriptEl.innerHTML);
                    newScriptEl.appendChild(scriptText);
                    (_a = oldScriptEl.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(newScriptEl, oldScriptEl);
                });
            }
            // update Factory AND Carpenter
            $carpenter === null || $carpenter === void 0 ? void 0 : $carpenter.requestUpdate();
            this.requestUpdate();
        });
    }
    getComponent(pathOrId) {
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
    selectComponent(id, engine) {
        // compose the url
        let url = `/component/${id}`;
        if (engine) {
            url += `?engine=${engine}`;
        }
        // maintain the history
        history.pushState({ id, engine }, '', url);
        // set the current component
        this._currentComponentId = id;
        // render the new component
        this._updateComponent();
    }
    // public setComponentValues(id: string, values: any): void {
    //   const component = this.getComponent(id);
    //   if (!component) {
    //     return;
    //   }
    //   component.values = values;
    //   this._updateComponent(component.name);
    // }
    toggleUiMode() {
        this.setUiMode(this.state.mode === 'dark' ? 'light' : 'dark');
    }
    _restoreUiMode() {
        if (this.state.mode) {
            this.setUiMode(this.state.mode);
        }
    }
    setUiMode(mode) {
        this.setState({ mode });
        if (mode === 'light') {
            document.body.classList.remove('-dark');
        }
        else {
            document.body.classList.add('-dark');
        }
    }
    randomizeComponentValues(id = this.currentComponentId) {
        if (!id) {
            return;
        }
        const component = this.getComponent(id);
        if (!component) {
            return;
        }
        // update the component with empty values
        component.values = {};
        // this._updateComponent({
        //   id,
        // });
    }
    _saveComponentValues(component, name) {
        return __awaiter(this, void 0, void 0, function* () {
            // post the new values to the server
            const request = yield fetch(`/api/saveValues/${component.name}`, {
                method: 'POST',
                body: JSON.stringify({
                    id: component.id,
                    name,
                    values: component.values,
                }),
            }), json = yield request.json();
            if (json.errors) {
                console.error(json.errors);
                return;
            }
            // update specs
            yield this._fetchSpecs();
            // remove the popin
            this._currentAction = null;
            // @TODO   send a notification
            this._sendNotification({
                id: 'valuesSaved',
                message: `Values saved as ${name}`,
                type: 'success',
                timeout: 2000,
            });
        });
    }
    _handleCommandPanelSelect(item) {
        let engine, id;
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
                //   this.currentComponent.name,
                //   this.currentComponent.savedValues[item.value.slice(1)]?.values,
                // );
                break;
        }
    }
    _renderComponents() {
        return html `
      ${this.specs.components
            ? html `
            <nav class=${this.cls('_components')}>
              <ol class="${this.cls('_components-list')}">
                ${Object.entries(this.specs.components).map(([id, component]) => html `
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
                        ${component.engines.map((engine) => html `
                            <li
                              class="${this.cls('_components-list-item-engine')} ${this.currentEngine === engine
                ? '-active'
                : ''}"
                              @pointerup=${(e) => {
                this.selectComponent(id, engine);
            }}
                            >
                              ${unsafeHTML(__logos[engine] || engine)}
                            </li>
                          `)}
                      </ol>
                    </li>
                  `)}
              </ol>
            </nav>
          `
            : ''}
    `;
    }
    _sendNotification(notification) {
        return __awaiter(this, void 0, void 0, function* () {
            this._notifications.push(notification);
            if (notification.timeout) {
                setTimeout(() => {
                    this._notifications = this._notifications.filter((n) => n !== notification);
                }, notification.timeout);
            }
        });
    }
    _renderSidebar() {
        return html `<nav class="${this.cls('_sidebar')}">
      <div class="${this.cls('_sidebar-inner')}">
        ${this._renderComponents()}
      </div>
    </nav>`;
    }
    _renderTopbar() {
        return html `<nav class="${this.cls('_topbar')}">
      <h1 class="${this.cls('_topbar-title')}">${__logoFactory}</h1>
      ${this.currentComponent
            ? html `<div class="${this.cls('_topbar-component')}">
            <h2 class="${this.cls('_topbar-component-name')}">
              ${__upperFirst(this.currentComponent.name)}
            </h2>
            <p class="${this.cls('_topbar-component-version')}">
              ${this.currentComponent.version}
            </p>
            <p class="${this.cls('_topbar-component-engine')}">
              ${__upperFirst(this.currentEngine)}
              ${unsafeHTML(__logos[this.currentEngine] || this.currentEngine)}
            </p>
          </div>`
            : ''}
    </nav>`;
    }
    _renderMode() {
        return html `
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
    _renderCommandPanel() {
        return html `<nav class="${this.cls('_command-panel')}">
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
    _renderNotifications() {
        if (!this._notifications.length) {
            return;
        }
        return html `
      <div class="${this.cls('_notifications')}">
        <ul class="${this.cls('_notifications-list')}">
          ${this._notifications.map((notification) => html `
              <li
                class="${this.cls('_notifications-item')} ${notification.type
            ? `-${notification.type}`
            : ''}"
              >
                <span class="${this.cls('_notifications-message')}">
                  ${notification.message}
                </span>
              </li>
            `)}
      </div>
    `;
    }
    _renderSaveValuesForm() {
        var _a;
        return html `
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
            this._saveComponentValues(this.currentComponent, formValues.name);
        }}
        >
          <s-json-schema-form
            id="s-factory-save-values-form"
            .formClasses=${true}
            .schema=${__saveComponentValuesSchema}
            .values=${{}}
          ></s-json-schema-form>
          <code class="${this.cls('_save-values-form-code')}">
            ${JSON.stringify((_a = this.currentComponent) === null || _a === void 0 ? void 0 : _a.values, null, 2)}
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
    _renderEditor() {
        return html `
      <div class="${this.cls('_editor')}">
        <div class="${this.cls('_editor-inner')}">
          <s-carpenter
            .component=${this.currentComponent}
            .verbose=${this.verbose}
            @s-carpenter.update=${() => {
            this._updateComponent();
        }}
            @s-carpenter.ready=${(e) => {
            var _a;
            this._initListeners((_a = e.detail.$iframe) === null || _a === void 0 ? void 0 : _a.contentDocument);
            this._initComponents();
        }}
          />
        </div>
      </div>
    `;
    }
    render() {
        return html `
      ${this._renderTopbar()} ${this._renderCommandPanel()}
      ${this._renderEditor()}
      ${this._currentAction === 'saveValues'
            ? this._renderSaveValuesForm()
            : ''}
      ${this._renderNotifications()}
    `;
    }
}
__decorate([
    property({ type: String })
], FactoryElement.prototype, "src", void 0);
__decorate([
    property({ type: String })
], FactoryElement.prototype, "commandPanelHotkey", void 0);
__decorate([
    property({ type: String })
], FactoryElement.prototype, "darkModeClass", void 0);
__decorate([
    state()
    // @ts-ignore
], FactoryElement.prototype, "specs", void 0);
__decorate([
    state()
], FactoryElement.prototype, "_notifications", void 0);
__decorate([
    state()
], FactoryElement.prototype, "_currentComponent", void 0);
__decorate([
    state()
], FactoryElement.prototype, "_currentComponentId", void 0);
__decorate([
    state()
], FactoryElement.prototype, "_components", void 0);
__decorate([
    state()
], FactoryElement.prototype, "_currentAction", void 0);
__decorate([
    state()
], FactoryElement.prototype, "_state", void 0);
FactoryElement.define('s-factory');
//# sourceMappingURL=factory.js.map