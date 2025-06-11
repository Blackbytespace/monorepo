import type { TCarpenterComponent, TCarpenterEvent, TCarpenterEventDetail, TCarpenterPreselectComponentSettings, TCarpenterSelectComponentSettings, TCarpenterUpdateObject } from './_exports.js';
export default class Carpenter {
    private static _$iframe?;
    private static _selectedComponent?;
    private static _preselectedComponent;
    private static get $window();
    static get $iframe(): HTMLIFrameElement | undefined;
    static set $iframe($iframe: HTMLIFrameElement | undefined);
    private static get _components();
    static get components(): TCarpenterComponent[];
    static get selectedComponent(): TCarpenterComponent | undefined;
    static get preselectedComponent(): TCarpenterComponent | null;
    static addEventListener(eventName: string, callback: (e: TCarpenterEvent) => void): void;
    static removeEventListener(eventName: string, callback: (e: TCarpenterEvent) => void): void;
    static dispatchEvent(eventName: string, detail: TCarpenterEventDetail): void;
    static preselectComponent(component: TCarpenterComponent, settings?: TCarpenterPreselectComponentSettings): void;
    static selectComponent(component: TCarpenterComponent, settings?: TCarpenterSelectComponentSettings): void;
    private static _triggerUpdate;
    static addComponent(component: TCarpenterComponent): void;
    static removeComponent(component: TCarpenterComponent | HTMLElement | string): void;
    static applyUpdate(component: TCarpenterComponent | HTMLElement | string, update: TCarpenterUpdateObject): void;
    static hasComponent($component: TCarpenterComponent | HTMLElement | string): boolean;
    static getComponent(component: TCarpenterComponent | HTMLElement | string): TCarpenterComponent | undefined;
}
