import __clone from 'lodash.clone';
import __deepClone from 'lodash.clonedeep';
export default function clone(object, settings = {}) {
    settings = Object.assign({ deep: false }, settings);
    if (settings.deep) {
        return __deepClone(object);
    }
    return __clone(object);
}
//# sourceMappingURL=clone.js.map