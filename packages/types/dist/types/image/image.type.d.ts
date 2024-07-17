export default interface IImage {
    src: string;
    sizes?: Record<string, string>;
    title?: string;
    alt?: string;
    lazy?: boolean;
    class?: string;
    attrs?: Record<string, string>;
}
export default class Image implements IImage {
    src: string;
    title?: string;
    alt?: string;
    lazy?: boolean;
    class?: string;
    attrs?: Record<string, string>;
    constructor(image?: IImage);
    toElement(): HTMLImageElement;
    toHtml(): string;
    toJsx(): JSX.Element;
}
