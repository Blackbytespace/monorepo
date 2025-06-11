import { __set } from '@lotsof/sugar/object';
import type {
  TCarpenterComponent,
  TCarpenterEvent,
  TCarpenterEventDetail,
  TCarpenterPreselectComponentSettings,
  TCarpenterSelectComponentSettings,
  TCarpenterUpdateObject,
} from './_exports.js';
import { __CarpenterVueProxy } from './_exports.js';

// save the carpenter vue proxy to access globally
// @ts-ignore
window.__CarpenterVueProxy = __CarpenterVueProxy;

export default class Carpenter {
  private static _$iframe?: HTMLIFrameElement;
  private static _selectedComponent?: TCarpenterComponent;
  private static _preselectedComponent: TCarpenterComponent | null = null;

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

  public static get $iframe(): HTMLIFrameElement | undefined {
    return this._$iframe;
  }

  public static set $iframe($iframe: HTMLIFrameElement | undefined) {
    this._$iframe = $iframe;
  }

  private static get _components(): Record<string, TCarpenterComponent> {
    return this.$window._carpenterComponents;
  }

  public static get components(): TCarpenterComponent[] {
    return Object.values(this._components);
  }

  public static get selectedComponent(): TCarpenterComponent | undefined {
    const keys = Object.keys(this._components);
    return this._selectedComponent ?? this._components[keys[0]];
  }

  public static get preselectedComponent(): TCarpenterComponent | null {
    return this._preselectedComponent;
  }

  public static addEventListener(
    eventName: string,
    callback: (e: TCarpenterEvent) => void,
  ): void {
    // @ts-ignore
    this.$window.addEventListener(`carpenter.${eventName}`, callback);
  }

  public static removeEventListener(
    eventName: string,
    callback: (e: TCarpenterEvent) => void,
  ): void {
    // @ts-ignore
    this.$window.removeEventListener(`carpenter.${eventName}`, callback);
  }

  public static dispatchEvent(
    eventName: string,
    detail: TCarpenterEventDetail,
  ): void {
    this.$window.dispatchEvent(
      new CustomEvent(`carpenter.${eventName}`, {
        bubbles: false,
        detail,
      }),
    );
  }

  public static preselectComponent(
    component: TCarpenterComponent,
    settings?: TCarpenterPreselectComponentSettings,
  ): void {
    if (component === this._preselectedComponent) {
      return;
    }
    if (!component.$component) {
      throw new Error('Component must have a $component property.');
    }
    if (!this.hasComponent(component.$component)) {
      throw new Error('Component not registered.');
    }
    const finalSettings: TCarpenterPreselectComponentSettings = {
      preventScroll: false,
      ...(settings ?? {}),
    };
    this._preselectedComponent = component;
    this.dispatchEvent('preselect', {
      component,
      preventScroll: finalSettings.preventScroll,
    });
    this._triggerUpdate();
  }

  public static selectComponent(
    component: TCarpenterComponent,
    settings?: TCarpenterSelectComponentSettings,
  ): void {
    if (component === this._selectedComponent) {
      return;
    }
    if (!component.$component) {
      throw new Error('Component must have a $component property.');
    }
    if (!this.hasComponent(component.$component)) {
      throw new Error('Component not registered.');
    }
    const finalSettings: TCarpenterSelectComponentSettings = {
      preventScroll: false,
      ...(settings ?? {}),
    };
    this._selectedComponent = component;
    this.dispatchEvent('select', {
      component,
      preventScroll: finalSettings.preventScroll,
    });
    this._triggerUpdate();
  }

  private static _triggerUpdate(): void {
    this.dispatchEvent('update', {});
  }

  public static addComponent(component: TCarpenterComponent): void {
    if (!component.$component) {
      throw new Error('Component must have a $component property.');
    }
    if (this.hasComponent(component.$component)) {
      throw new Error('Component already registered.');
    }
    this._components[component.id] = component;
    this._triggerUpdate();
  }

  public static removeComponent(
    component: TCarpenterComponent | HTMLElement | string,
  ): void {
    let componentId;
    if (typeof component === 'string') {
      componentId = component;
    } else if (component instanceof HTMLElement) {
      componentId = (<HTMLElement>component).getAttribute('carpenter');
    } else {
      componentId = component.id;
    }
    delete this._components[componentId];
    this._triggerUpdate();
  }

  public static applyUpdate(
    component: TCarpenterComponent | HTMLElement | string,
    update: TCarpenterUpdateObject,
  ): void {
    const comp = this.getComponent(component);
    if (!comp) {
      throw new Error('Component not found.');
    }
    __set(comp.values, update.path, update.value);
    comp.update(comp.values);
    this._triggerUpdate();
  }

  public static hasComponent(
    $component: TCarpenterComponent | HTMLElement | string,
  ): boolean {
    return this.getComponent($component) !== undefined;
  }

  public static getComponent(
    component: TCarpenterComponent | HTMLElement | string,
  ): TCarpenterComponent | undefined {
    // if already a component, return it directly
    // @ts-ignore
    if (component.$component) {
      return component as TCarpenterComponent;
    }

    // otherwise, get the component by its id
    // if it's a string, use it directly, otherwise get the id from the attribute
    let componentId: string =
      (typeof component === 'string'
        ? component
        : (<HTMLElement>component).getAttribute('carpenter')) || '';
    if (!componentId) {
      return;
    }
    return this._components[componentId];
  }
}
