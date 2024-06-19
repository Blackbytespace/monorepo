export default class Image {
    constructor(image) {
        Object.assign(this, image !== null && image !== void 0 ? image : {});
    }
    toJsx() {
        return (React.createElement("img", { src: this.src, sizes: this.sizes, title: this.title, alt: this.alt }));
    }
}
//# sourceMappingURL=image.type.js.map