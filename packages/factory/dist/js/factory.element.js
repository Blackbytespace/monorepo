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
import { __escapeQueueLength, __hotkey, } from '@lotsof/sugar/keyboard';
import { __clone } from '@lotsof/sugar/object';
import { __uniqid, __upperFirst } from '@lotsof/sugar/string';
import { html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../../src/css/output/factory.build.css';
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
    constructor() {
        super('s-factory');
        this.src = '/api/specs';
        this.commandPanelHotkey = 'cmd+p';
        this.darkModeClass = '-dark';
        this.specs = {};
        this._notifications = [];
        this._selectedComponent = null;
        this._components = {};
        this._currentAction = null;
        this._showEditor = false;
        this._state = {};
        this._$commandPanelSelect = null;
        this._$carpenter = null;
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
    get selectedComponent() {
        return this._components[this.selectedComponentId];
    }
    get selectedComponentId() {
        return this._selectedComponentId;
    }
    get preselectedComponent() {
        return this._components[this.preselectedComponentId];
    }
    get preselectedComponentId() {
        return this._preselectedComponentId;
    }
    get componentsToRender() {
        var _a;
        // getted from the url
        const matches = document.location.pathname.match(/^\/component\/([^\?]+)/);
        return (_a = matches === null || matches === void 0 ? void 0 : matches[1]) === null || _a === void 0 ? void 0 : _a.split('+');
    }
    showEditor() {
        this._showEditor = true;
        document.body.classList.add('-show-editor');
    }
    hideUi() {
        this._showEditor = false;
        document.body.classList.remove('-show-editor');
    }
    _fetchSpecs() {
        return __awaiter(this, void 0, void 0, function* () {
            // fetch the specs from the server
            const request = yield fetch(this.src), json = yield request.json();
            // set the specs
            this.specs = json;
        });
    }
    firstUpdated(_changedProperties) {
        // save the carpenter reference
        this._$carpenter = this.querySelector('s-carpenter');
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
                        return Object.entries(this.selectedComponent.engines).map(([idx, name]) => {
                            return {
                                id: `!${this.selectedComponent.id}`,
                                value: `!${this.selectedComponent.id}`,
                                preventSet: true,
                                label: `${__upperFirst(name)}`,
                                engine: name,
                            };
                        });
                        break;
                    case (_c = api.search) === null || _c === void 0 ? void 0 : _c.startsWith('<'):
                        return Object.entries(this.selectedComponent.savedValues).map(([key, savedData]) => {
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
            var _a;
            switch (true) {
                case e.key === '§':
                    // do not hide ui if it was shown with the `showEditor` method
                    if (this._showEditor) {
                        return;
                    }
                    //
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
            const escapeQueueLength = __escapeQueueLength();
            if (escapeQueueLength === 0) {
                this.hideUi();
            }
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
            this.randomizeComponentValues(this.selectedComponentId);
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
            this._postComponent(path);
        });
        // set the current component to be the first one
        this._selectedComponentId = Object.keys(this._components)[0];
        document.querySelectorAll('#factory-css, #factory-js').forEach(($el) => {
            var _a, _b;
            // add the css/js to the iframe
            (_b = (_a = this._$carpenter) === null || _a === void 0 ? void 0 : _a.$iframe) === null || _b === void 0 ? void 0 : _b.contentDocument.head.appendChild($el.cloneNode(true));
        });
    }
    _postComponent() {
        return __awaiter(this, arguments, void 0, function* (pathOrId = this.selectedComponentId, settings = {}) {
            var _a, _b, _c, _d, _e, _f, _g;
            const finalSettings = Object.assign({ $iframe: (_a = this._$carpenter) === null || _a === void 0 ? void 0 : _a.$iframe }, settings);
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
            // handling assets
            if (json.assets) {
                for (let asset of json.assets) {
                    const $asset = new DOMParser().parseFromString(asset, 'text/html').head
                        .firstChild;
                    if (!$asset) {
                        continue;
                    }
                    const id = $asset.getAttribute('id');
                    if ((_b = finalSettings.$iframe) === null || _b === void 0 ? void 0 : _b.contentDocument.querySelector(`#${id}-wrapper`)) {
                        // already exists, continue
                        continue;
                    }
                    // add the asset to the iframe
                    (_c = finalSettings.$iframe) === null || _c === void 0 ? void 0 : _c.contentDocument.head.appendChild($asset);
                }
            }
            if ((_d = this._$carpenter.$iframe.contentWindow._carpenterComponents) === null || _d === void 0 ? void 0 : _d[component.id]) {
                (_f = (_e = this._$carpenter.$iframe.contentWindow._carpenterComponents[component.id]) === null || _e === void 0 ? void 0 : _e.update) === null || _f === void 0 ? void 0 : _f.call(_e, this._components[component.id].values);
            }
            else {
                const newComponentDom = new DOMParser().parseFromString(json.html, 'text/html');
                const $newComponent = newComponentDom.querySelector(`#${component.id}-wrapper`);
                // add the new component in the iframe
                finalSettings.$iframe.contentDocument.body.appendChild($newComponent);
                // make sure the scripts are executed
                Array.from($newComponent.querySelectorAll('script')).forEach((oldScriptEl) => {
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
            (_g = this._$carpenter) === null || _g === void 0 ? void 0 : _g.requestUpdate();
            this.requestUpdate();
        });
    }
    setComponent(pathOrId, newComponent) {
        const component = this.getComponent(pathOrId);
        this._components[component.id] = newComponent;
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
    randomizeComponentValues(id = this.selectedComponentId) {
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
    _renderTopbar() {
        return html `<nav class="${this.cls('_topbar')}">
      <h1 class="${this.cls('_topbar-title')}">${__logoFactory}</h1>
      ${this.selectedComponent
            ? html `<div class="${this.cls('_topbar-component')}">
            <h2 class="${this.cls('_topbar-component-name')}">
              ${__upperFirst(this.selectedComponent.name)}
            </h2>
            <p class="${this.cls('_topbar-component-version')}">
              ${this.selectedComponent.version}
            </p>
            <p class="${this.cls('_topbar-component-engine')}">
              ${__upperFirst(this.currentEngine)}
              ${unsafeHTML(__logos[this.currentEngine] || this.currentEngine)}
            </p>
          </div>`
            : ''}
    </nav>`;
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
            ${JSON.stringify((_a = this.selectedComponent) === null || _a === void 0 ? void 0 : _a.values, null, 2)}
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
      <s-carpenter
        .lnf=${this.lnf}
        .uiMode=${this.state.mode}
        .verbose=${this.verbose}
        .appendToBody=${false}
        .addInternalName=${true}
        .centerContent=${true}
        @s-carpenter.update=${(e) => {
            this.setComponent(e.detail.component.id, e.detail.component);
            this._postComponent(e.detail.id);
        }}
        @s-carpenter.ready=${(e) => {
            setTimeout(() => {
                var _a;
                this._initListeners((_a = e.detail.$iframe) === null || _a === void 0 ? void 0 : _a.contentDocument);
            });
            this._initComponents();
        }}
        @s-carpenter.component.connect=${(e) => {
            var _a;
            if (!((_a = e.details) === null || _a === void 0 ? void 0 : _a.id)) {
                return;
            }
            // add the component to the list
            this._components[e.detail.id] = e.detail;
        }}
        @s-carpenter.component.disconnect=${(e) => {
            var _a;
            if (!((_a = e.details) === null || _a === void 0 ? void 0 : _a.id)) {
                return;
            }
            // add the component to the list
            delete this._components[e.detail.id];
        }}
        @s-carpenter.preselect=${(e) => {
            var _a;
            if (!((_a = e.detail) === null || _a === void 0 ? void 0 : _a.id) || !this._components[e.detail.id]) {
                return;
            }
            // set the preselected component id
            this._preselectedComponentId = e.detail.id;
        }}
        @s-carpenter.select=${(e) => {
            var _a;
            if (!((_a = e.detail) === null || _a === void 0 ? void 0 : _a.id) || !this._components[e.detail.id]) {
                return;
            }
            // set the selected component id
            this._selectedComponentId = e.detail.id;
        }}
        @s-carpenter.edit=${(e) => {
            // show the editor
            this.showEditor();
            // set the selected component id
            this._selectedComponentId = e.detail.id;
        }}
      />
    `;
    }
    render() {
        if (__isInIframe()) {
            return '';
        }
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
], FactoryElement.prototype, "_selectedComponent", void 0);
__decorate([
    state()
], FactoryElement.prototype, "_selectedComponentId", void 0);
__decorate([
    state()
], FactoryElement.prototype, "_preselectedComponentId", void 0);
__decorate([
    state()
], FactoryElement.prototype, "_components", void 0);
__decorate([
    state()
], FactoryElement.prototype, "_currentAction", void 0);
__decorate([
    state()
], FactoryElement.prototype, "_showEditor", void 0);
__decorate([
    state()
], FactoryElement.prototype, "_state", void 0);
FactoryElement.define('s-factory');
//# sourceMappingURL=factory.element.js.map