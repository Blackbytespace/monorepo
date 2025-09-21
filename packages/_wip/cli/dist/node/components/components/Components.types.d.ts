import Components from './Components.js';
import ComponentsPackage from './ComponentsPackage.js';
import ComponentsSource from './ComponentsSource.js';
export interface IComponentsSourceMetas {
}
export interface IComponentsSourceSettings {
    id: string;
    name: string;
    type: 'git';
    components: Components;
}
export interface IComponentsDefaults {
    engine: string;
}
export interface IComponentGitSourceSettings extends IComponentsSourceSettings {
    url: string;
}
export interface IComponentsPackageJson {
    version: string;
    name: string;
    description?: string;
}
export interface IComponentsPackageSettings {
    rootDir: string;
    components: Components;
}
export interface IComponentJsonSubset {
    type: 'list';
    question: string;
    choices: string[];
    files: Record<string, <string>() => string[]>;
}
export interface IComponentJson {
    version: string;
    name: string;
    description?: string;
    subset?: IComponentJsonSubset;
    dependencies?: Record<string, string | IComponent>;
}
export interface IComponent extends IComponentJson {
    package: ComponentsPackage;
    path: string;
    absPath: string;
}
export interface IComponentsSettings {
    rootDir: string;
    defaults: IComponentsDefaults;
}
export interface IComponentsSourceUpdateResult {
    updated: boolean;
}
export interface IComponentsSourcesUpdateResult {
    sources: Record<string, ComponentsSource>;
}
export interface IComponentsAddComponentOptions {
    dir: string;
    y: boolean;
    override: boolean;
}
export interface IComponentsAddComponentResult {
    component: IComponent;
}
