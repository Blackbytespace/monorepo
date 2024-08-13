import __BaseType from '../base/base.type.js';
import __LinkType from '../link/link.type.js';
class __ButtonType extends __BaseType {
    constructor(props = {}) {
        var _a;
        super(props);
        this.style = (_a = props.style) !== null && _a !== void 0 ? _a : 'solid';
        if (!props.link) {
            this.link = new __LinkType();
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
__ButtonType.styles = ['solid', 'outline', 'text'];
export default __ButtonType;
//# sourceMappingURL=button.type.js.map