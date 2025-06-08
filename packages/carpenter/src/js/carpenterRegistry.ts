import type { TCarpenterComponent } from './_exports.js';

export default class CarpenterRegistry {
  private static get $window(): {
    _carpenterComponents: Record<string, TCarpenterComponent>;
  } & Window {
    const $window = (<any>window).parent || <any>window;
    if (!$window._carpenterComponents) {
      const _carpenterComponents: Record<string, TCarpenterComponent> = {};
      $window._carpenterComponents = _carpenterComponents;
    }
    return $window;
  }

  private static get _components(): Record<string, TCarpenterComponent> {
    return this.$window._carpenterComponents;
  }

  public static get components(): TCarpenterComponent[] {
    return Object.values(this._components);
  }

  public static addComponent(component: TCarpenterComponent): void {
    if (!component.$component) {
      throw new Error('Component must have a $component property.');
    }
    if (this.hasComponent(component.$component)) {
      throw new Error('Component already registered.');
    }
    this._components[component.id] = component;
  }

  public static removeComponent(component: TCarpenterComponent): void {
    if (!component.$component) {
      throw new Error('Component must have a $component property.');
    }
    delete this._components[component.id];
  }

  public static updateComponent(
    $component: HTMLElement | string,
    newValues: any,
  ): void {
    const component = this.getComponent($component);
    if (!component) {
      throw new Error('Component not found.');
    }
    component.values = {
      ...component.values,
      ...newValues,
    };
  }

  public static hasComponent($component: HTMLElement | string): boolean {
    return this.getComponent($component) !== undefined;
  }

  public static getComponent(
    $component: HTMLElement | string,
  ): TCarpenterComponent | undefined {
    let componentId: string =
      (typeof $component === 'string'
        ? $component
        : $component.getAttribute('carpenter')) || '';
    if (!componentId) {
      return;
    }
    return this._components[componentId];
  }
}
