import __isClassInstance from '../is/isClassInstance';
import __isPlainObject from '../is/isPlainObject';
import __deepMerge from '../object/deepMerge';
import __clone from './clone';
export default function __deepMap(objectOrArray, processor, settings, _path = []) {
    settings = __deepMerge({
        classInstances: false,
        array: true,
        clone: false,
        privateProps: true,
    }, settings);
    const isArray = Array.isArray(objectOrArray);
    let newObject = isArray
        ? []
        : settings.clone
            ? __clone(objectOrArray, { deep: true })
            : anyOrArray;
    Object.keys(objectOrArray).forEach((prop) => {
        if (!settings.privateProps && prop.match(/^_/))
            return;
        if (__isPlainObject(objectOrArray[prop]) ||
            (__isClassInstance(objectOrArray[prop]) && settings.classInstances) ||
            (Array.isArray(objectOrArray[prop]) && settings.array)) {
            const res = __deepMap(objectOrArray[prop], processor, Object.assign(Object.assign({}, settings), { clone: false }), [..._path, prop]);
            if (isArray) {
                newObject.push(res);
            }
            else {
                if (prop === '...' && __isPlainObject(res)) {
                    newObject = Object.assign(Object.assign({}, newObject), res);
                }
                else {
                    newObject[prop] = res;
                }
            }
            return;
        }
        const res = processor({
            object: anyOrArray,
            prop,
            value: anyOrArray[prop],
            path: [..._path, prop].join('.'),
        });
        if (res === -1) {
            delete newObject[prop];
            return;
        }
        if (isArray) {
            newObject.push(res);
        }
        else {
            if (prop === '...' && __isPlainObject(res)) {
                // console.log('DEFEF', res);
                newObject = Object.assign(Object.assign({}, newObject), res);
            }
            else {
                newObject[prop] = res;
            }
        }
    });
    return newObject;
}
//# sourceMappingURL=deepMap.js.map