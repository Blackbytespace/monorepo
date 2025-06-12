import { __escapeQueue } from '@lotsof/sugar/keyboard';
import { __set } from '@lotsof/sugar/object';
import { __CarpenterVueProxy } from './_exports.js';
// save the carpenter vue proxy to access globally
// @ts-ignore
window.__CarpenterVueProxy = __CarpenterVueProxy;
class Carpenter {
    static get $window() {
        const $window = window.parent || window;
        if (!$window._carpenterComponents) {
            const _carpenterComponents = {};
            $window._carpenterComponents = _carpenterComponents;
        }
        return $window;
    }
    static get $iframe() {
        return this._$iframe;
    }
    static set $iframe($iframe) {
        this._$iframe = $iframe;
    }
    static get contexts() {
        var _a;
        return [document, (_a = this.$iframe) === null || _a === void 0 ? void 0 : _a.contentDocument].filter((doc) => doc !== undefined && doc !== null);
    }
    static get _components() {
        return this.$window._carpenterComponents;
    }
    static get components() {
        return Object.values(this._components);
    }
    static get selectedComponent() {
        return this._selectedComponent;
    }
    static get preselectedComponent() {
        return this._preselectedComponent;
    }
    static addEventListener(eventName, callback) {
        // @ts-ignore
        this.$window.addEventListener(`carpenter.${eventName}`, callback);
    }
    static removeEventListener(eventName, callback) {
        // @ts-ignore
        this.$window.removeEventListener(`carpenter.${eventName}`, callback);
    }
    static dispatchEvent(eventName, detail) {
        this.$window.dispatchEvent(new CustomEvent(`carpenter.${eventName}`, {
            bubbles: false,
            detail,
        }));
    }
    static preselectComponent(component, settings) {
        if (component === this._preselectedComponent) {
            return;
        }
        if (!component.$component) {
            throw new Error('Component must have a $component property.');
        }
        if (!this.hasComponent(component.$component)) {
            throw new Error('Component not registered.');
        }
        const finalSettings = Object.assign({ preventScroll: false }, (settings !== null && settings !== void 0 ? settings : {}));
        this._preselectedComponent = component;
        this.dispatchEvent('preselect', {
            component,
            preventScroll: finalSettings.preventScroll,
        });
        this._triggerUpdate();
    }
    static selectComponent(component, settings) {
        if (component === this._selectedComponent) {
            return;
        }
        if (!component.$component) {
            throw new Error('Component must have a $component property.');
        }
        if (!this.hasComponent(component.$component)) {
            throw new Error('Component not registered.');
        }
        const finalSettings = Object.assign({ preventScroll: false }, (settings !== null && settings !== void 0 ? settings : {}));
        this._selectedComponent = component;
        this.dispatchEvent('select', {
            component,
            preventScroll: finalSettings.preventScroll,
        });
        // add an action in the escape queue
        __escapeQueue(() => {
            this._selectedComponent = undefined;
            this._triggerUpdate();
        }, {
            ctx: this.contexts,
        });
        // trigger an update across the app
        this._triggerUpdate();
    }
    static _triggerUpdate() {
        this.dispatchEvent('update', {});
    }
    static addComponent(component) {
        if (!component.$component) {
            throw new Error('Component must have a $component property.');
        }
        if (this.hasComponent(component.$component)) {
            throw new Error('Component already registered.');
        }
        this._components[component.id] = component;
        this._triggerUpdate();
    }
    static removeComponent(component) {
        let componentId;
        if (typeof component === 'string') {
            componentId = component;
        }
        else if (component instanceof HTMLElement) {
            componentId = component.getAttribute('carpenter');
        }
        else {
            componentId = component.id;
        }
        delete this._components[componentId];
        this._triggerUpdate();
    }
    static applyUpdate(component, update) {
        const comp = this.getComponent(component);
        if (!comp) {
            throw new Error('Component not found.');
        }
        __set(comp.values, update.path, update.value);
        comp.update(comp.values);
        this._triggerUpdate();
    }
    static hasComponent($component) {
        return this.getComponent($component) !== undefined;
    }
    static getComponent(component) {
        // if already a component, return it directly
        // @ts-ignore
        if (component.$component) {
            return component;
        }
        // otherwise, get the component by its id
        // if it's a string, use it directly, otherwise get the id from the attribute
        let componentId = (typeof component === 'string'
            ? component
            : component.getAttribute('carpenter')) || '';
        if (!componentId) {
            return;
        }
        return this._components[componentId];
    }
}
Carpenter._preselectedComponent = null;
export default Carpenter;
//# sourceMappingURL=carpenter.js.map