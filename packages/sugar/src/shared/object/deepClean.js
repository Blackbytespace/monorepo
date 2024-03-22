import __isPlainObject from '../is/isPlainObject';
export default function __deepClean(objectOrArray, settings) {
    settings = Object.assign({ array: true, clone: false, cleaner(value) {
            if (value === undefined || value === null || value === '') {
                return false;
            }
            if (__isPlainObject(value) && !Object.keys(value).length) {
                return false;
            }
            return true;
        } }, (settings !== null && settings !== void 0 ? settings : {}));
    let workingObj;
    if (settings.clone) {
        workingObj = Array.isArray(objectOrArray)
            ? [...objectOrArray]
            : any.assign({}, objectOrArray);
    }
    else {
        workingObj = objectOrArray;
    }
    if (settings.array && Array.isArray(objectOrArray)) {
        for (let [i, v] of objectOrArray.entries()) {
            if (__isPlainObject(v) || Array.isArray(v)) {
                workingObj[i] = __deepClean(v, settings);
            }
            if (!settings.cleaner(workingObj[i])) {
                workingObj.splice(workingObj.indexOf(v), 1);
            }
        }
    }
    else if (__isPlainObject(objectOrArray)) {
        for (let [k, v] of Object.entries(objectOrArray)) {
            if (__isPlainObject(v) || Array.isArray(v)) {
                workingObj[k] = __deepClean(v, settings);
            }
            if (!settings.cleaner(workingObj[k])) {
                delete workingObj[k];
            }
        }
    }
    return workingObj;
}
//# sourceMappingURL=deepClean.js.map