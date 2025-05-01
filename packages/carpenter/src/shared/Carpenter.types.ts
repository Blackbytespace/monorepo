import { JSONSchema7 } from 'json-schema';

import { TComponentsComponentJson } from '@lotsof/components';
import { TJsonSchemaFormWidget } from '@lotsof/json-schema-form/src/shared/JsonSchemaForm.types.js';

export type TCarpenterState = {
  mode?: 'light' | 'dark';
  media?: string;
};

export type TCarpenterMediaQuery = {
  name: string;
  min: number;
  max: number;
};

export type TCarpenterComponentJson = TComponentsComponentJson & {
  path: string;
  engines: string[];
  mocks: Record<string, string>;
  files: string[];
  values: any;
  schema: any;
};

export type TCarpenterNotification = {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timeout: number;
};

export type TCarpenterComponent = {
  id: string;
  name: string;
  description?: string;
  schema: JSONSchema7;
  values: any;
  savedValues: any;
  $component: Element;
};

export type TCarpenterCustomEvent = CustomEvent & {
  detail: TCarpenterComponent;
};

export type TCarpenterAdapter = {
  applyUpdate(TCarpenterUpdateObject): void;
};

export type TCarpenterWidget = TJsonSchemaFormWidget & {};
