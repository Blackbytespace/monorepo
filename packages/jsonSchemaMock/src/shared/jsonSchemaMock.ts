import { JSONSchema7 } from 'json-schema';
import { TJsonSchemaMockSettings } from './jsonSchemaMock.types.js';

export default class JsonSchemaMock {
  private _settings: TJsonSchemaMockSettings = {};

  constructor(settings?: Partial<TJsonSchemaMockSettings>) {
    this._settings = {
      ...(settings ?? {}),
    };
  }

  public getValue();

  public mockProperty(property: JSONSchema7): any {
    switch (property.type) {
      case 'string':
        break;
      case 'boolean':
        return Math.random() < 0.5; // Random boolean
      case 'number':
        return Math.random() * 100; // Random number between 0 and 100
      case 'integer':
        return Math.floor(Math.random() * 100); // Random integer between 0 and 100
      case 'array':
        if (property.items?.type) {
        }
    }

    console.log('property', property);
  }

  public mock(schema: JSONSchema7): any {
    const mockData: any = {};

    if (schema.properties) {
      for (const [key, property] of Object.entries(schema.properties)) {
        if (property && typeof property === 'object') {
          mockData[key] = this.mockProperty(property);
        } else {
          console.warn(`Property ${key} is not a valid JSON Schema object.`);
        }
      }
    }
  }
}
