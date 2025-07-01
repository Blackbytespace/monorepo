import { __isPlainObject } from '@lotsof/sugar/is';
import { __clone, __deepMerge } from '@lotsof/sugar/object';
class JsonSchemaMock {
    static registerSchema(name, schema) {
        if (this.schemas[name]) {
            throw new Error(`Schema with name "${name}" already exists.`);
        }
        this.schemas[name] = schema;
    }
    constructor(settings) {
        this._settings = {};
        this._settings = Object.assign({}, (settings !== null && settings !== void 0 ? settings : {}));
    }
    applyExtends(schema) {
        for (const key in schema) {
            if (__isPlainObject(schema[key])) {
                schema[key] = this.applyExtends(schema[key]);
            }
        }
        if (schema.$extends) {
            if (!JsonSchemaMock.schemas[schema.$extends]) {
                throw new Error(`Schema with name "${schema.$extends}" does not exist. Make sure to register it first using JsonSchemaMock.registerSchema.`);
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
JsonSchemaMock.schemas = {};
export default JsonSchemaMock;
//# sourceMappingURL=jsonSchemaUtils.js.map