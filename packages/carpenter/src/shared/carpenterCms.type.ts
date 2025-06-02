import {
  TComponentsComponentJson,
  TComponentsComponentObject,
  TComponentsSettings,
} from '@lotsof/components';
import {
  TJsonSchemaFormUpdateObject,
  TJsonSchemaFormWidget,
} from '@lotsof/json-schema-form';

export type TCarpenterCmsState = {
  mode?: 'light' | 'dark';
  media?: string;
};

export type TCarpenterCmsServerConfig = {
  hostname: string;
  port: number;
  entrypoint: string;
};

export type TCarpenterCmsMediaQuery = {
  name: string;
  min: number;
  max: number;
};

export type TCarpenterCmsComponentJson = TComponentsComponentJson & {
  path: string;
  engines: string[];
  mocks: Record<string, string>;
  files: string[];
  values: any;
  schema: any;
};

export type TCarpenterCmsSpecs = {
  components: Record<string, TCarpenterCmsComponentJson>;
  config: TCarpenterCmsConfig;
};

export type TCarpenterCmsUTConfig = {
  assets: Record<string, string>;
};

export type TCarpenterCmsProjectServerConfig = {
  protocol: 'http' | 'https';
  hostname: string;
  port: number;
};

export type TCarpenterCmsProjectConfig = {
  rootDir: string;
  server: TCarpenterCmsProjectServerConfig;
  assets: Record<string, string>;
};

export type TCarpenterCmsNotification = {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timeout: number;
};

export type TCarpenterCmsUpdateComponentSettings = {
  id?: string;
  path?: string;
  engine?: string;
  $iframe?: HTMLIFrameElement;
};

export type TCarpenterCmsConfig = {
  components: TComponentsSettings;
  server: TCarpenterCmsServerConfig;
  ui: TCarpenterCmsUTConfig;
  project: TCarpenterCmsProjectConfig;
};

export type TCarpenterCmsComponent = {
  html?: string;
  $component: Element;
} & TComponentsComponentObject;

export type TCarpenterCmsUpdateObject = TJsonSchemaFormUpdateObject & {
  component: TCarpenterCmsComponent;
};

export type TCarpenterCmsUpdateResult = {
  component: TCarpenterCmsComponent;
  path: string[];
  value: any;
  html?: string;
};

export type TCarpenterCmsCustomEvent = CustomEvent & {
  detail: TCarpenterCmsComponent;
};

export type TCarpenterCmsAdapter = {
  applyUpdate(TCarpenterCmsUpdateObject): void;
};

export type TCarpenterCmsWidget = TJsonSchemaFormWidget & {};
