var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import __LitElement from '@lotsof/lit-element';
import { __querySelectorLive } from '@lotsof/sugar/dom';
import { html } from 'lit';
// @ts-ignore
import { __copyText } from '@lotsof/sugar/clipboard';
import { __isDarkMode } from '@lotsof/sugar/is';
import { property } from 'lit/decorators.js';
import '../../src/css/output/carpenter.build.css';
import __Carpenter from './carpenter.js';
export default class CarpenterDaemonElement extends __LitElement {
    constructor() {
        super('s-carpenter-daemon');
        this.scrollOnSelect = false;
        this.scrollOnPreselect = false;
        this._preventScroll = false;
    }
    get $document() {
        return this.ownerDocument;
    }
    get $window() {
        // @ts-ignore
        return this.$document.defaultView || this.$document.parentWindow;
    }
    get component() {
        var _a;
        return (_a = __Carpenter.preselectedComponent) !== null && _a !== void 0 ? _a : __Carpenter.selectedComponent;
    }
    mount() {
        __Carpenter.addEventListener('update', () => {
            setTimeout(() => {
                this._updateDaemonPosition();
            }, 200);
        });
    }
    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
        // update the ui mode depending on the
        // mode of the website
        this.updateUiMode();
    }
    updateUiMode() {
        // set the daemon ui mode depending on
        // the mode of the website
        if (__isDarkMode({
            rootNode: this.parentElement,
        })) {
            this.classList.add('-light');
            this.classList.remove('-dark');
        }
        else {
            this.classList.add('-dark');
            this.classList.remove('-light');
        }
    }
    adoptedCallback() {
        // update the ui mode dependingon the
        // mode of the website
        this.updateUiMode();
        // query live for all the components
        __querySelectorLive('[carpenter]', ($component) => {
            if (!$component.parentElement) {
                return;
            }
            // init the component
            this._initComponent($component);
        }, {
            disconnectedCallback: ($component) => {
                this._deleteComponent($component);
            },
            rootNode: this.$document,
        });
        // update the position of the daemon on resize
        this.$window.addEventListener('resize', () => {
            this._updateDaemonPosition();
        });
    }
    _initComponent($component) {
        var _a;
        // update the conponent if one is already registered
        const existingComponent = __Carpenter.getComponent((_a = $component.getAttribute('carpenter')) !== null && _a !== void 0 ? _a : '');
        // if the component is already registered
        // update his $component property
        if (existingComponent) {
            // __Carpenter.update$ComponentRef($component, $component);
            existingComponent.$component = $component;
        }
        // get the component from carpenter
        const component = __Carpenter.getComponent($component);
        // when mouseenter, trigger the preselect event
        $component.addEventListener('mouseenter', () => {
            const component = __Carpenter.getComponent($component);
            if (!component) {
                return;
            }
            // this.preselect($component);
            this._preselect(component, {
                preventScroll: true,
            });
        });
    }
    _preselect(component, settings) {
        var _a;
        __Carpenter.preselectComponent(component, settings);
        this._onPreselect(component);
        this._preventScroll = (_a = settings === null || settings === void 0 ? void 0 : settings.preventScroll) !== null && _a !== void 0 ? _a : false;
    }
    _onPreselect(component) {
        // update the daemon position
        this._updateDaemonPosition();
        // scroll to the component if the scroll setting is true
        if (this.scrollOnPreselect && !this._preventScroll) {
            component.$component.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center',
            });
        }
        this._preventScroll = false;
        this.requestUpdate();
    }
    _select(component) {
        // select the component
        __Carpenter.selectComponent(component);
        this._onSelect(component);
    }
    // select actions
    _onSelect(component) {
        // update the daemon position
        this._updateDaemonPosition();
        // scroll to the component if the scroll setting is true
        if (this.scrollOnSelect) {
            component.$component.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center',
            });
        }
    }
    _edit(component) {
        __Carpenter.dispatchEvent('edit', {
            component,
        });
    }
    _deleteComponent($component) {
        __Carpenter.removeComponent($component);
    }
    _updateDaemonPosition() {
        var _a, _b, _c, _d, _e, _f;
        if (!this.component) {
            return;
        }
        const top = (_b = (_a = this.component.$component) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().top) !== null && _b !== void 0 ? _b : 0;
        const left = (_d = (_c = this.component.$component) === null || _c === void 0 ? void 0 : _c.getBoundingClientRect().left) !== null && _d !== void 0 ? _d : 0;
        const width = (_e = this.component.$component) === null || _e === void 0 ? void 0 : _e.getBoundingClientRect().width;
        const height = (_f = this.component.$component) === null || _f === void 0 ? void 0 : _f.getBoundingClientRect().height;
        const scrollTop = this.$window.scrollY || this.$document.documentElement.scrollTop;
        const scrollLeft = this.$window.scrollX || this.$document.documentElement.scrollLeft;
        this.style.top = `${top + scrollTop}px`;
        this.style.left = `${left + scrollLeft}px`;
        this.style.width = `${width}px`;
        this.style.height = `${height}px`;
    }
    render() {
        var _a, _b, _c, _d, _e;
        return html `<div
      class="${`${this.cls('_inner')}`}"
      @dblclick=${() => {
            if (!__Carpenter.preselectedComponent) {
                return;
            }
            this._select(__Carpenter.preselectedComponent);
            this._edit(__Carpenter.preselectedComponent);
        }}
    >
      <div class="${this.cls('_header')}">
        <span class="${this.cls('_title')}">${(_a = this.component) === null || _a === void 0 ? void 0 : _a.name}</span>
        ${((_c = (_b = this.component) === null || _b === void 0 ? void 0 : _b.values) === null || _c === void 0 ? void 0 : _c.id)
            ? html `
              <button
                class="${this.cls('_id')}"
                @click=${() => {
                var _a, _b, _c;
                __copyText((_c = (_b = (_a = this.component) === null || _a === void 0 ? void 0 : _a.values) === null || _b === void 0 ? void 0 : _b.id) !== null && _c !== void 0 ? _c : '');
            }}
              >
                ${(_e = (_d = this.component) === null || _d === void 0 ? void 0 : _d.values) === null || _e === void 0 ? void 0 : _e.id}
                <s-icon type="outline" name="clipboard-document-list" />
              </button>
            `
            : ''}
      </div>
      <div class="${this.cls('_tools')}">
        <button
          class="${this.cls('_tool')}"
          @click=${() => {
            if (!__Carpenter.preselectedComponent) {
                return;
            }
            this._select(__Carpenter.preselectedComponent);
            this._edit(__Carpenter.preselectedComponent);
        }}
        >
          <span class="${this.cls('_tool-label')}">Edit</span>
          <s-icon type="solid" name="pencil"></s-icon>
        </button>
      </div>
    </div> `;
    }
}
__decorate([
    property({ type: Boolean })
], CarpenterDaemonElement.prototype, "scrollOnSelect", void 0);
__decorate([
    property({ type: Boolean })
], CarpenterDaemonElement.prototype, "scrollOnPreselect", void 0);
//# sourceMappingURL=carpenterDaemon.element.js.map