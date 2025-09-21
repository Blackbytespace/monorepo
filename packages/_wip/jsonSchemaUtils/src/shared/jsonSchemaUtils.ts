import { __isPlainObject } from '@blackbyte/sugar/is';
import { __clone, __deepMerge } from '@blackbyte/sugar/object';
import { JSONSchema7 } from 'json-schema';
import {
  TJsonSchemaUtilsSchema,
  TJsonSchemaUtilsSettings,
} from './jsonSchemaUtils.type.js';

export default class JsonSchemaMock {
  private static schemas: Record<string, JSONSchema7> = {};

  public static registerSchema(
    name: string,
    schema: TJsonSchemaUtilsSchema,
  ): void {
    if (this.schemas[name]) {
      throw new Error(`Schema with name "${name}" already exists.`);
    }
    this.schemas[name] = schema;
  }

  private _settings: TJsonSchemaUtilsSettings = {};

  constructor(settings?: Partial<TJsonSchemaUtilsSettings>) {
    this._settings = {
      ...(settings ?? {}),
    };
  }

  public applyExtends(schema: TJsonSchemaUtilsSchema): TJsonSchemaUtilsSchema {
    for (const key in schema) {
      if (__isPlainObject(schema[key])) {
        schema[key] = this.applyExtends(schema[key]);
      }
    }

    if (schema.$extends) {
      if (!JsonSchemaMock.schemas[schema.$extends]) {
        throw new Error(
          `Schema with name "${schema.$extends}" does not exist. Make sure to register it first using JsonSchemaMock.registerSchema.`,
        );
      }
      const extendedSchema = __clone(JsonSchemaMock.schemas[schema.$extends], {
        deep: true,
      });
      schema = __deepMerge([extendedSchema, schema], {
        clone: true,
      });
    }

    return schema;
  }
}
