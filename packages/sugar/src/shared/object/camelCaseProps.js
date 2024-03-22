import __isPlainObject from '../is/isPlainObject';
import __camelCase from '../string/camelCase';
export default function __camelCaseProps(object, settings) {
    const finalSettings = Object.assign({ deep: true }, (settings !== null && settings !== void 0 ? settings : {}));
    for (let [key, value] of Object.entries(object)) {
        const newKey = __camelCase(key);
        // treat deep
        if (__isPlainObject(value) && finalSettings.deep) {
            object[newKey] = __camelCaseProps(object[key], finalSettings);
        }
        else {
            object[newKey] = value;
        }
        // delete old key if needed
        if (newKey !== key) {
            delete object[key];
        }
    }
    return object;
}
//# sourceMappingURL=camelCaseProps.js.map