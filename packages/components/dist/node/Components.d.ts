import './Components.config.js';
import { TComponentsAddComponentOptions, TComponentsAddComponentResult, TComponentsLibrariesUpdateResult, TComponentsLibrarySettings, TComponentsSettings } from './Components.types.js';
import __ComponentLibrary from './ComponentsLibrary.js';
import { __ComponentsComponent, __ComponentsLibrary } from './_exports.js';
export default class Components {
    private _libraries;
    settings: TComponentsSettings;
    get libraryRootDir(): string;
    constructor(settings?: TComponentsSettings);
    checkDependencies(): Promise<void>;
    registerLibraryFromSettings(settings: TComponentsLibrarySettings): __ComponentsLibrary;
    registerLibrary(library: __ComponentsLibrary): __ComponentsLibrary;
    get libraries(): Record<string, __ComponentsLibrary>;
    updateLibraries(): Promise<TComponentsLibrariesUpdateResult>;
    getLibraries(): Record<string, __ComponentLibrary>;
    getComponents(): Record<string, __ComponentsComponent>;
    addComponent(componentId: string, options?: TComponentsAddComponentOptions, isDependency?: boolean): Promise<TComponentsAddComponentResult | undefined>;
}
