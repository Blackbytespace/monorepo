export default class Image {
    constructor(image) {
        this.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP88B8AAuUB8e2ujYwAAAAASUVORK5CYII=';
        this.lazy = true;
        this.class = '_image';
        this.attrs = {
            class: '_image',
            style: 'object-fit: cover; background: white;',
        };
        Object.assign(this, image !== null && image !== void 0 ? image : {});
    }
    toElement() {
        var _a;
        const img = document.createElement('img');
        img.src = this.src;
        if (this.lazy) {
            img.loading = 'lazy';
        }
        if (this.title) {
            img.title = this.title;
        }
        if (this.alt) {
            img.alt = this.alt;
        }
        if (this.class) {
            img.classList.add(this.class);
        }
        Object.entries((_a = this.attrs) !== null && _a !== void 0 ? _a : {}).forEach(([key, value]) => {
            img.setAttribute(key, value);
        });
        return img;
    }
    toHtml() {
        var _a;
        return `<img ${this.class ? `class="${this.class}"` : ''} src="${this.src}" ${this.lazy ? 'loading="lazy"' : ''} title="${this.title}" alt="${this.alt}" ${Object.entries((_a = this.attrs) !== null && _a !== void 0 ? _a : {})
            .map(([key, value]) => `${key}="${value}"`)
            .join(' ')} />`;
    }
    toJsx() {
        return (
        // @ts-ignore
        React.createElement("img", Object.assign({ src: this.src }, (this.lazy ? { loading: 'lazy' } : {}), { title: this.title, alt: this.alt }, this.attrs)));
    }
}
//# sourceMappingURL=image.type.js.map