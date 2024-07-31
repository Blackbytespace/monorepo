import __Base from '../base/base.type.js';
import __Link from '../link/link.type.js';

export interface IButtonProps {
  style?: 'solid' | 'outline' | 'text';
  class?: string;
  link?: __Link;
}

export default class __Button extends __Base {
  public static styles: string[] = ['solid', 'outline', 'text'];

  protected style: 'solid' | 'outline' | 'text';
  protected class?: string;
  // @ts-ignore
  protected link: __Link;

  public constructor(props: IButtonProps = {}) {
    super(props);

    this.style = props.style ?? 'solid';
    if (!props.link) {
      this.link = new __Link();
    }
  }

  public validate(): void {
    if (!__Button.styles.includes(this.style)) {
      throw new Error(
        `Invalid style. Available styles are: ${__Button.styles.join(', ')}`,
      );
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
