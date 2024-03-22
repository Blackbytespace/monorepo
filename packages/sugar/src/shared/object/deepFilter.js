import __isPlainObject from '../is/isPlainObject';
function processObj(object, filter, settings) {
    const newObj = {}, keys = Object.keys(object);
    // loop on the object keys
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = object[key];
        // pass the property in the filter function
        const res = filter({
            key,
            value,
            isObject: __isPlainObject(value),
        });
        // true mean: we keep this totally
        if (res === true) {
            if (__isPlainObject(value)) {
                (newObj[key] = settings.clone ? Object.assign({}, value) : value),
                    filter,
                    settings;
            }
            else {
                newObj[key] = value;
            }
        }
        else if (res === undefined) {
            if (__isPlainObject(value)) {
                newObj[key] = settings.clone
                    ? processObj(Object.assign({}, value), filter, settings)
                    : processObj(value, filter, settings);
            }
            else {
                newObj[key] = value;
            }
        }
        // false mean: we do not keep this
        else if (res === false) {
            continue;
        }
    }
    return newObj;
}
export default function __deepFilter(object, filter, settings) {
    settings = Object.assign({ clone: true }, (settings !== null && settings !== void 0 ? settings : {}));
    return processObj(settings.clone ? Object.assign({}, object) : any, filter, settings);
}
//# sourceMappingURL=deepFilter.js.map