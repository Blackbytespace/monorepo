import { JSONSchema7 } from 'json-schema';

export type TJsonSchemaUtilsSettings = {};

export type TJsonSchemaUtilsSchema = {
  $extends?: string;
  faker?: any;
} & JSONSchema7;
