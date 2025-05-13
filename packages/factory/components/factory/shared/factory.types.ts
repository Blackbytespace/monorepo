import {
  TComponentsComponentJson,
  TComponentsComponentObject,
  TComponentsSettings,
} from '@lotsof/components';
import {
  TJsonSchemaFormUpdateObject,
  TJsonSchemaFormWidget,
} from '@lotsof/json-schema-form';

export type TFactoryState = {
  mode?: 'light' | 'dark';
  media?: string;
};

export type TFactoryServerConfig = {
  hostname: string;
  port: number;
  entrypoint: string;
};

export type TFactoryMediaQuery = {
  name: string;
  min: number;
  max: number;
};

export type TFactoryComponentJson = TComponentsComponentJson & {
  path: string;
  engines: string[];
  mocks: Record<string, string>;
  files: string[];
  values: any;
  schema: any;
};

export type TFactorySpecs = {
  components: Record<string, TFactoryComponentJson>;
  config: TFactoryConfig;
};

export type TFactoryUTConfig = {
  assets: Record<string, string>;
};

export type TFactoryProjectServerConfig = {
  protocol: 'http' | 'https';
  hostname: string;
  port: number;
};

export type TFactoryProjectConfig = {
  rootDir: string;
  server: TFactoryProjectServerConfig;
  assets: Record<string, string>;
};

export type TFactoryNotification = {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timeout: number;
};

export type TFactoryUpdateComponentSettings = {
  id?: string;
  path?: string;
  engine?: string;
  $iframe?: HTMLIFrameElement;
};

export type TFactoryConfig = {
  components: TComponentsSettings;
  server: TFactoryServerConfig;
  ui: TFactoryUTConfig;
  project: TFactoryProjectConfig;
};

export type TFactoryComponent = {
  html?: string;
  $component: Element;
} & TComponentsComponentObject;

export type TFactoryUpdateObject = TJsonSchemaFormUpdateObject & {
  component: TFactoryComponent;
};

export type TFactoryUpdateResult = {
  component: TFactoryComponent;
  path: string[];
  value: any;
  html?: string;
};

export type TFactoryCustomEvent = CustomEvent & {
  detail: TFactoryComponent;
};

export type TFactoryAdapter = {
  applyUpdate(TFactoryUpdateObject): void;
};

export type TFactoryWidget = TJsonSchemaFormWidget & {};
