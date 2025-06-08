import type { TCarpenterComponent } from './_exports.js';
export default class CarpenterRegistry {
    private static get $window();
    private static get _components();
    static get components(): TCarpenterComponent[];
    static addComponent(component: TCarpenterComponent): void;
    static removeComponent(component: TCarpenterComponent): void;
    static updateComponent($component: HTMLElement | string, newValues: any): void;
    static hasComponent($component: HTMLElement | string): boolean;
    static getComponent($component: HTMLElement | string): TCarpenterComponent | undefined;
}
