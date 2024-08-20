import __BaseType from '../base/base.type.js';

export type TLinkProps = {
  href?: string;
  text?: string;
  title?: string;
  target?: '_blank' | '_self';
  class?: string;
  noopener?: boolean;
  noreferrer?: boolean;
  ariaLabel?: string;
};

export default class __LinkType extends __BaseType {
  protected href?: string;
  protected text?: string;
  protected title?: string;
  protected target: '_blank' | '_self' = '_self';
  protected class?: string;
  protected noopener?: boolean;
  protected noreferrer?: boolean;
  protected ariaLabel?: string;

  constructor(props: TLinkProps = {}) {
    super(props);

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

  public toDomElement(): HTMLElement {
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

  public rel(): string {
    return `${this.noopener ? 'noopener' : ''} ${
      this.noreferrer ? 'noreferrer' : ''
    }`.trim();
  }
}
