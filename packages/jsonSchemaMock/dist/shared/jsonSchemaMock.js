export default class JsonSchemaMock {
    constructor(settings) {
        this._settings = {};
        this._settings = Object.assign({}, (settings !== null && settings !== void 0 ? settings : {}));
    }
    mockProperty(property) {
        var _a;
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
                if ((_a = property.items) === null || _a === void 0 ? void 0 : _a.type) {
                }
        }
        console.log('property', property);
    }
    mock(schema) {
        const mockData = {};
        if (schema.properties) {
            for (const [key, property] of Object.entries(schema.properties)) {
                if (property && typeof property === 'object') {
                    mockData[key] = this.mockProperty(property);
                }
                else {
                    console.warn(`Property ${key} is not a valid JSON Schema object.`);
                }
            }
        }
    }
}
//# sourceMappingURL=jsonSchemaMock.js.map