import __Base from '../base/base.type.js';
export default class __Link extends __Base {
    constructor(props = {}) {
        super(props);
        this.target = '_self';
        if (!this.title && this.text) {
            this.title = this.text;
        }
        if (this.noopener === undefined && this.target === '_blank') {
            this.noopener = true;
        }
        if (this.noreferrer === undefined && this.target === '_blank') {
            this.noreferrer = true;
        }
        if (this.ariaLabel === undefined && this.text) {
            this.ariaLabel = this.text;
        }
    }
    toDomElement() {
        const $a = document.createElement('a');
        if (this.class) {
            $a.classList.add(this.class);
        }
        if (this.href) {
            $a.setAttribute('href', this.href);
        }
        if (this.title) {
            $a.setAttribute('title', this.title);
        }
        if (this.target) {
            $a.setAttribute('target', this.target);
        }
        if (this.ariaLabel) {
            $a.setAttribute('aria-label', this.ariaLabel);
        }
        if (this.text) {
            $a.innerHTML = this.text;
        }
        if (this.rel()) {
            $a.setAttribute('rel', this.rel());
        }
        return $a;
    }
    rel() {
        return `${this.noopener ? 'noopener' : ''} ${this.noreferrer ? 'noreferrer' : ''}`.trim();
    }
}
//# sourceMappingURL=link.type.js.map