export default class __BaseType {
    constructor(props = {}) {
        this.id = '';
        this.data = {};
        if (props.id === undefined) {
            this.id = `${this.constructor.name.toLowerCase()}-${Math.random()
                .toString(36)
                .substr(2, 9)}`;
        }
        else {
            this.id = props.id;
        }
    }
    validate() {
        // @TODO    Implement json schema validation
        return [];
    }
    set(key, value) {
        this.data[key] = value;
    }
    toObject() {
        return this.data;
    }
    has(key) {
        if (this.data[key] === undefined || this.data[key] === null) {
            return false;
        }
        if (typeof this.data[key] === 'string' && this.data[key].trim() === '') {
            return false;
        }
        if (Array.isArray(this.data[key]) && this.data[key].length === 0) {
            return false;
        }
        return true;
    }
}
//# sourceMappingURL=base.type.js.map