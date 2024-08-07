import __Base from '../base/base.type.js';
import { __richText } from '@lotsof/sugar/faker';
export default class Typo extends __Base {
    static mock(props = {}, settings) {
        const text = __richText(settings);
        return new this(Object.assign({ text }, props));
    }
    constructor(props = {}) {
        super(props);
    }
}
//# sourceMappingURL=typo.type.js.map