import { JSONSchema7 } from 'json-schema';
import { TJsonSchemaMockSettings } from './jsonSchemaMock.types.js';
export default class JsonSchemaMock {
    private _settings;
    constructor(settings?: Partial<TJsonSchemaMockSettings>);
    getValue(): any;
    mockProperty(property: JSONSchema7): any;
    mock(schema: JSONSchema7): any;
}
