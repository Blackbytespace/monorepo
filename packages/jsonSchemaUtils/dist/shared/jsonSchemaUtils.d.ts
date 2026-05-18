import { TJsonSchemaUtilsSchema, TJsonSchemaUtilsSettings } from './jsonSchemaUtils.type.js';
export default class JsonSchemaMock {
    private static schemas;
    static registerSchema(name: string, schema: TJsonSchemaUtilsSchema): void;
    private _settings;
    constructor(settings?: Partial<TJsonSchemaUtilsSettings>);
    applyExtends(schema: TJsonSchemaUtilsSchema): TJsonSchemaUtilsSchema;
}
