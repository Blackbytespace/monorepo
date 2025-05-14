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
    }
    _initComponent($component) {
        $component.addEventListener('mousemove', () => {
            this._setComponent($component);
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
        console.log('top', top);
        console.log('left', left);
        console.log('width', width);
        console.log('height', height);
        this.style.top = `${top}px`;
        this.style.left = `${left}px`;
        this.style.width = `${width}px`;
        this.style.height = `${height}px`;
    }
    render() {
        return html `<div class="${this.cls('_inner')}">
      <div class="${this.cls('_tools')}">
        <div class="${this.cls('_tool')}">Edit</div>
      </div>
    </div> `;
    }
}
//# sourceMappingURL=carpenterDaemon.element.js.map