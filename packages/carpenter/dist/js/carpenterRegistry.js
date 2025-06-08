export default class CarpenterRegistry {
    static get $window() {
        const $window = window.parent || window;
        if (!$window._carpenterComponents) {
            const _carpenterComponents = {};
            $window._carpenterComponents = _carpenterComponents;
        }
        return $window;
    }
    static get _components() {
        return this.$window._carpenterComponents;
    }
    static get components() {
        return Object.values(this._components);
    }
    static addComponent(component) {
        if (!component.$component) {
            throw new Error('Component must have a $component property.');
        }
        if (this.hasComponent(component.$component)) {
            throw new Error('Component already registered.');
        }
        this._components[component.id] = component;
    }
    static removeComponent(component) {
        if (!component.$component) {
            throw new Error('Component must have a $component property.');
        }
        delete this._components[component.id];
    }
    static updateComponent($component, newValues) {
        const component = this.getComponent($component);
        if (!component) {
            throw new Error('Component not found.');
        }
        component.values = Object.assign(Object.assign({}, component.values), newValues);
    }
    static hasComponent($component) {
        return this.getComponent($component) !== undefined;
    }
    static getComponent($component) {
        let componentId = (typeof $component === 'string'
            ? $component
            : $component.getAttribute('carpenter')) || '';
        if (!componentId) {
            return;
        }
        return this._components[componentId];
    }
}
//# sourceMappingURL=carpenterRegistry.js.map