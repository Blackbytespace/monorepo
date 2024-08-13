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
import __LitElement from '@lotsof/litElement';
// @todo    check why is a problem importing this functions
// @ts-ignore
import { __isInIframe } from '@lotsof/sugar/is';
import { __injectHtml } from '@lotsof/sugar/dom';
import { html } from 'lit';
import { property, state } from 'lit/decorators.js';
import '../../src/css/FactoryElement.css';
export default class FactoryElement extends __LitElement {
    constructor() {
        super();
        this.src = '/api/specs';
        this.specs = {};
        this._currentComponent = null;
        this._currentComponentId = '';
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
    get isDaemon() {
        return __isInIframe();
    }
    get currentEngine() {
        if (!this.currentComponentId) {
            return;
        }
        const matches = document.location.pathname.match(/^\/component\/[a-zA-Z0-9_-]+\/([^\/]+)/);
        return matches === null || matches === void 0 ? void 0 : matches[1];
    }
    get currentComponentId() {
        const matches = document.location.pathname.match(/^\/component\/([^\/]+)/);
        return matches === null || matches === void 0 ? void 0 : matches[1];
    }
    _fetchSpecs() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield fetch(this.src), json = yield request.json();
            this.specs = json;
        });
    }
    get $iframeDocument() {
        var _a;
        return (_a = this._$iframe) === null || _a === void 0 ? void 0 : _a.contentDocument;
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            // if not in an iframe, init the environment
            // by creating an iframe and load the factory deamon
            // inside it
            if (this.isDaemon) {
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
            // render component if the current component is set
            if (this.currentComponentId) {
                this._renderComponentInIframe(this.currentComponentId);
            }
        });
    }
    _initListeners(context) {
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
    registerComponent(component) {
        this.log(`Registering the component (${component.name})[#${component.id}]`);
        // this._specs.components[component.id] = component;
    }
    _initEnvironment() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
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
        (_a = $iframe === null || $iframe === void 0 ? void 0 : $iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.document.open();
        (_b = $iframe === null || $iframe === void 0 ? void 0 : $iframe.contentWindow) === null || _b === void 0 ? void 0 : _b.document.write(document.documentElement.outerHTML);
        (_c = $iframe === null || $iframe === void 0 ? void 0 : $iframe.contentWindow) === null || _c === void 0 ? void 0 : _c.document.close();
        (_e = (_d = this.$iframeDocument) === null || _d === void 0 ? void 0 : _d.querySelector(`.${this.cls('_iframe')}`)) === null || _e === void 0 ? void 0 : _e.remove();
        (_g = (_f = this.$iframeDocument) === null || _f === void 0 ? void 0 : _f.querySelector(this.tagName)) === null || _g === void 0 ? void 0 : _g.remove();
        // inject the actual website assets into the iframe
        for (let [key, value] of Object.entries((_l = (_k = (_j = (_h = this.specs) === null || _h === void 0 ? void 0 : _h.config) === null || _j === void 0 ? void 0 : _j.project) === null || _k === void 0 ? void 0 : _k.assets) !== null && _l !== void 0 ? _l : {})) {
            switch (true) {
                case value.includes('.js') || value.includes('.ts'):
                    const $script = (_o = (_m = this._$iframe) === null || _m === void 0 ? void 0 : _m.contentDocument) === null || _o === void 0 ? void 0 : _o.createElement('script');
                    $script.src = value;
                    $script === null || $script === void 0 ? void 0 : $script.setAttribute('type', 'module');
                    (_q = (_p = this._$iframe) === null || _p === void 0 ? void 0 : _p.contentDocument) === null || _q === void 0 ? void 0 : _q.head.appendChild($script);
                    break;
                case value.includes('.css'):
                    const $link = (_s = (_r = this._$iframe) === null || _r === void 0 ? void 0 : _r.contentDocument) === null || _s === void 0 ? void 0 : _s.createElement('link');
                    $link.href = value;
                    $link.rel = 'stylesheet';
                    (_u = (_t = this._$iframe) === null || _t === void 0 ? void 0 : _t.contentDocument) === null || _u === void 0 ? void 0 : _u.head.appendChild($link);
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
    _setIframeContent(html) {
        var _a, _b;
        if (!((_b = (_a = this._$iframe) === null || _a === void 0 ? void 0 : _a.contentDocument) === null || _b === void 0 ? void 0 : _b.body)) {
            return;
        }
        __injectHtml(this._$iframe.contentDocument.body, html);
    }
    _injectFactoryDeamon() {
        var _a, _b, _c, _d;
        const $deamon = (_b = (_a = this._$iframe) === null || _a === void 0 ? void 0 : _a.contentDocument) === null || _b === void 0 ? void 0 : _b.createElement('s-factoryd');
        $deamon.setAttribute('id', 's-factoryd');
        $deamon.setAttribute('verbose', this.verbose ? 'true' : 'false');
        $deamon.addEventListener('factory.component', (e) => {
            this.registerComponent(e.detail);
        });
        $deamon.addEventListener('factory.edit', (e) => {
            //   this._currentComponent = (<CustomEvent>e).detail;
            this.requestUpdate();
        });
        (_d = (_c = this._$iframe) === null || _c === void 0 ? void 0 : _c.contentDocument) === null || _d === void 0 ? void 0 : _d.body.appendChild($deamon);
    }
    _applyUpdate(update) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    _renderComponentInIframe(id, engine) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `/api/render/${id}`;
            if (engine) {
                url += `/${engine}`;
            }
            const request = yield fetch(url), html = yield request.text();
            this._setIframeContent(html);
        });
    }
    selectComponent(id, engine) {
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
                              ${engine}
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
    _renderSidebar() {
        return html `<nav class="${this.cls('_sidebar')}">
      ${this._renderComponents()}
    </nav>`;
    }
    render() {
        return html ` ${this._renderSidebar()} `;
    }
}
__decorate([
    property({ type: String })
], FactoryElement.prototype, "src", void 0);
__decorate([
    state()
    // @ts-ignore
], FactoryElement.prototype, "specs", void 0);
__decorate([
    state()
], FactoryElement.prototype, "_currentComponent", void 0);
__decorate([
    state()
], FactoryElement.prototype, "_currentComponentId", void 0);
FactoryElement.define('s-factory', FactoryElement);
//# sourceMappingURL=FactoryElement.js.map