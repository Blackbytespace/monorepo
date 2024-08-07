import __Base from '../base/base.type.js';
import __Link from '../link/link.type.js';
class __Button extends __Base {
    constructor(props = {}) {
        var _a;
        super(props);
        this.style = (_a = props.style) !== null && _a !== void 0 ? _a : 'solid';
        if (!props.link) {
            this.link = new __Link();
        }
    }
    toDomElement() {
        const $button = document.createElement('button');
        $button.classList.add(`button`);
        if (this.class) {
            $button.classList.add(this.class);
        }
        $button.classList.add(`-${this.style}`);
        const $link = this.link.toDomElement();
        $button.innerHTML = $link.innerHTML;
        for (let attr of $link.attributes) {
            $button.setAttribute(attr.name, `${attr.value}`);
        }
        return $button;
    }
}
__Button.styles = ['solid', 'outline', 'text'];
export default __Button;
//# sourceMappingURL=button.type.js.map