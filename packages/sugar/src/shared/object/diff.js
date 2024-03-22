import __isEqual from 'is-equal';
import __isPlainObject from '../is/isPlainObject';
export default function __diff(object1, object2, settings = {}) {
    settings = Object.assign({ deep: true, added: true, deleted: false, equals: false, emptyObject: false, updated: true }, settings);
    const finalObj = {};
    const keys = Array.from(new Set([...Object.keys(object1), ...Object.keys(object2)]));
    for (let i = 0; i < keys.length; i++) {
        const _prop = keys[i];
        if (settings.deep) {
            if (__isPlainObject(object1[_prop]) && __isPlainObject(object2[_prop])) {
                finalObj[_prop] = __diff(object1[_prop], object2[_prop], settings);
                if (Object.keys(finalObj[_prop]).length === 0)
                    delete finalObj[_prop];
                continue;
            }
        }
        if (settings.added) {
            if (object1[_prop] === undefined && object2[_prop] !== undefined) {
                finalObj[_prop] = object2[_prop];
                continue;
            }
        }
        if (settings.deleted) {
            if (object1[_prop] !== undefined && object2[_prop] === undefined) {
                // delete object1[_prop];
                finalObj[_prop] = object1[_prop];
                continue;
            }
        }
        if (settings.equals) {
            if (__isEqual(object1[_prop], object2[_prop])) {
                finalObj[_prop] = object2[_prop];
                continue;
            }
        }
        if (settings.emptyObject) {
            if (__isPlainObject(object1[_prop]) &&
                Object.keys(object1[_prop]).length === 0) {
                finalObj[_prop] = {};
                continue;
            }
        }
        if (settings.updated) {
            if (object1[_prop] === undefined || object2[_prop] === undefined) {
                continue;
            }
            if (!__isEqual(object1[_prop], object2[_prop])) {
                finalObj[_prop] = object2[_prop];
                continue;
            }
        }
    }
    return finalObj;
}
//# sourceMappingURL=diff.js.map