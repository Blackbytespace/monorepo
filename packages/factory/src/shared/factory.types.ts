import { IComponentsSettings } from '@lotsof/components';

import { IComponentsComponentJson } from '@lotsof/components';

export interface IFactoryServerConfig {
  hostname: string;
  port: number;
  entrypoint: string;
}

export interface IFactoryComponentJson extends IComponentsComponentJson {
  path: string;
}

export interface IFactorySpecs {
  components: Record<string, IFactoryComponentJson>;
  config: IFactoryConfig;
}

export interface IFactoryUiConfig {
  assets: Record<string, string>;
}

export interface IFactoryProjectServerConfig {
  protocol: 'http' | 'https';
  hostname: string;
  port: number;
}

export interface IFactoryProjectConfig {
  rootDir: string;
  server: IFactoryProjectServerConfig;
  assets: Record<string, string>;
}

export interface IFactoryConfig {
  components: IComponentsSettings;
  server: IFactoryServerConfig;
  ui: IFactoryUiConfig;
  project: IFactoryProjectConfig;
}

import { JSONSchema7 } from 'json-schema';

import {
  IJsonSchemaFormUpdateObject,
  IJsonSchemaFormWidget,
} from '@lotsof/json-schema-form/src/shared/JsonSchemaForm.types.js';

export interface IFactoryComponent {
  id: string;
  name: string;
  description?: string;
  schema: JSONSchema7;
  values: any;
  $component: Element;
}

export interface IFactoryUpdateObject extends IJsonSchemaFormUpdateObject {
  component: IFactoryComponent;
}

export interface IFactoryUpdateResult {
  component: IFactoryComponent;
  path: string[];
  value: any;
  html?: string;
}

export interface IFactoryCustomEvent extends CustomEvent {
  detail: IFactoryComponent;
}

export interface IFactoryAdapter {
  applyUpdate(IFactoryUpdateObject): void;
}

export interface IFactoryWidget extends IJsonSchemaFormWidget {}
