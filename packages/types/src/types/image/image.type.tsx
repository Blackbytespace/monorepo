export default interface IImage {
  src: string;
  sizes?: Record<string, string>;
  title?: string;
  alt?: string;
}

export default class Image implements IImage {
  src: string;
  sizes?: Record<string, string>;
  title?: string;
  alt?: string;

  constructor(image?: IImage) {
    Object.assign(this, image ?? {});
  }

  public toJsx(): JSX.Element {
    return (
      <img
        src={this.src}
        sizes={this.sizes}
        title={this.title}
        alt={this.alt}
      />
    );
  }
}
