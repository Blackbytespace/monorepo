export default class __Base {
    constructor(props = {}) {
        // assign the properties to the instance
        for (let [key, value] of Object.entries(props)) {
            this.set(key, value);
        }
    }
    set($key, $value) {
        this[$key] = $value;
    }
    toHtml() {
        // @ts-ignore
        if (!this.toDomElement) {
            throw new Error(`toDomElement method not found in class ' . ${this.constructor.name} . '. You will need to implement your own \"toHtml\" method...`);
        }
        // @ts-ignore
        const $domElement = this.toDomElement();
        return $domElement.outerHTML;
    }
}
//# sourceMappingURL=base.type.js.map