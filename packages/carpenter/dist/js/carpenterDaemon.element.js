import __LitElement from '@lotsof/lit-element';
import { __injectStyle, __querySelectorLive } from '@lotsof/sugar/dom';
import { html } from 'lit';
// @ts-ignore
import __css from '../../src/css/carpenterDaemon.css?raw';
export default class CarpenterDaemonElement extends __LitElement {
    constructor() {
        super('s-carpenter-daemon');
        this.$currentComponent = null;
    }
    get $document() {
        return this.ownerDocument;
    }
    get $window() {
        // @ts-ignore
        return this.$document.defaultView || this.$document.parentWindow;
    }
    adoptedCallback() {
        // inject the stylesheet
        __injectStyle(__css, {
            id: 's-carpenter-daemon-css',
            rootNode: this.$document.head,
        });
        // query live for all the components
        __querySelectorLive('[type="lotsof/component"]', ($component) => {
            this._initComponent($component);
        }, {
            rootNode: this.$document,
        });
        // update the position of the daemon on resize
        this.$window.addEventListener('resize', () => {
            this._setDaemonPosition();
        });
    }
    _initComponent($component) {
        // move the daemon on the component
        $component.addEventListener('mousemove', () => {
            this._setComponent($component);
        });
        // when doubleclick, trigger the edit event
        $component.addEventListener('dblclick', () => {
            this.dispatch('edit', {
                bubbles: true,
                detail: {
                    id: $component.getAttribute('id'),
                    $component,
                },
            });
        });
    }
    _setComponent($component) {
        // do nothing if the component is already set
        if (this.$currentComponent === $component) {
            return;
        }
        // set the current component
        this.$currentComponent = $component;
        // update the position of the daemon
        this._setDaemonPosition();
    }
    _setDaemonPosition() {
        var _a, _b, _c, _d;
        const top = (_a = this.$currentComponent) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().top;
        const left = (_b = this.$currentComponent) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect().left;
        const width = (_c = this.$currentComponent) === null || _c === void 0 ? void 0 : _c.getBoundingClientRect().width;
        const height = (_d = this.$currentComponent) === null || _d === void 0 ? void 0 : _d.getBoundingClientRect().height;
        this.style.top = `${top}px`;
        this.style.left = `${left}px`;
        this.style.width = `${width}px`;
        this.style.height = `${height}px`;
    }
    render() {
        return html `<div class="${this.cls('_inner')}">
      <div class="${this.cls('_tools')}">
        <div
          class="${this.cls('_tool')}"
          @click=${() => {
            var _a;
            this.dispatch('edit', {
                bubbles: true,
                detail: {
                    id: (_a = this.$currentComponent) === null || _a === void 0 ? void 0 : _a.getAttribute('id'),
                    $component: this.$currentComponent,
                },
            });
        }}
        >
          <span class="${this.cls('_tool-label')}">Edit</span>
          <s-icon name="pencil"></s-icon>
        </div>
      </div>
    </div> `;
    }
}
//# sourceMappingURL=carpenterDaemon.element.js.map