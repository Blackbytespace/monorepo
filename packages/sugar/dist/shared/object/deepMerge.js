import __isPlainObject from '../is/isPlainObject.js';
export default function __deepMerge(...args) {
    var _a;
    let settings = {}, hasSettings = false;
    const potentialSettings = (_a = args[args.length - 1]) !== null && _a !== void 0 ? _a : {};
    if (potentialSettings &&
        Object.keys(potentialSettings).length <= 2 &&
        (potentialSettings.array !== undefined ||
            potentialSettings.clone !== undefined)) {
        hasSettings = true;
        settings = potentialSettings;
    }
    let finalSettings = Object.assign({ array: false, clone: true }, settings);
    function merge(firstObj, secondObj) {
        const newObj = finalSettings.clone ? {} : firstObj;
        if (!secondObj)
            return firstObj;
        const firstProps = Object.getOwnPropertyNames(firstObj);
        firstProps.forEach((key) => {
            const desc = Object.getOwnPropertyDescriptor(firstObj, key);
            if ((desc === null || desc === void 0 ? void 0 : desc.set) || (desc === null || desc === void 0 ? void 0 : desc.get)) {
                Object.defineProperty(newObj, key, desc);
            }
            else {
                newObj[key] = firstObj[key];
            }
        });
        const secondProps = Object.getOwnPropertyNames(secondObj);
        secondProps.forEach((key) => {
            const secondObjDesc = Object.getOwnPropertyDescriptor(secondObj, key);
            if ((secondObjDesc === null || secondObjDesc === void 0 ? void 0 : secondObjDesc.set) || (secondObjDesc === null || secondObjDesc === void 0 ? void 0 : secondObjDesc.get)) {
                Object.defineProperty(newObj, key, secondObjDesc);
            }
            else if (finalSettings.array &&
                Array.isArray(firstObj[key]) &&
                Array.isArray(secondObj[key])) {
                newObj[key] = [...firstObj[key], ...secondObj[key]];
            }
            else if (__isPlainObject(newObj[key]) &&
                __isPlainObject(secondObj[key])) {
                newObj[key] = merge(newObj[key], secondObj[key]);
            }
            else {
                newObj[key] = secondObj[key];
            }
        });
        return newObj;
    }
    if (hasSettings) {
        args.pop();
    }
    let currentObj = finalSettings.clone ? {} : args[0];
    for (let i = 0; i < args.length; i++) {
        const toMergeObj = args[i];
        currentObj = merge(currentObj, toMergeObj);
    }
    return currentObj;
}
//# sourceMappingURL=deepMerge.js.map