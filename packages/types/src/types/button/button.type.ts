import __BaseType from '../base/base.type.js';
import __LinkType from '../link/link.type.js';

export type TButton = {
  style?: 'solid' | 'outline' | 'text';
  class?: string;
  link?: __LinkType;
};

export default class __ButtonType extends __BaseType {
  public static styles: string[] = ['solid', 'outline', 'text'];

  protected style: 'solid' | 'outline' | 'text';
  protected class?: string;
  // @ts-ignore
  protected link: __Link;

  public constructor(props: TButton = {}) {
    super(props);

    this.style = props.style ?? 'solid';
    if (!props.link) {
      this.link = new __LinkType();
    }
  }

  public toDomElement(): HTMLElement {
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
