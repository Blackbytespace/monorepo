import __LitElement from '@lotsof/lit-element';
import { __injectStyle, __querySelectorLive } from '@lotsof/sugar/dom';
import { html } from 'lit';
// @ts-ignore
import __css from '../../src/css/carpenterDaemon.css?raw';

export default class CarpenterDaemonElement extends __LitElement {
  public $currentComponent: Element | null = null;

  constructor() {
    super('s-carpenter-daemon');
  }

  get $document(): Document {
    return this.ownerDocument;
  }

  public adoptedCallback(): void {
    // inject the stylesheet
    __injectStyle(__css, {
      id: 's-carpenter-daemon-css',
      rootNode: this.$document.head,
    });

    // query live for all the components
    __querySelectorLive(
      '[type="lotsof/component"]',
      ($component) => {
        this._initComponent($component);
      },
      {
        rootNode: this.$document,
      },
    );
  }

  private _initComponent($component: Element): void {
    $component.addEventListener('mousemove', () => {
      this._setComponent($component);
    });
  }

  private _setComponent($component: Element): void {
    // do nothing if the component is already set
    if (this.$currentComponent === $component) {
      return;
    }
    // set the current component
    this.$currentComponent = $component;
    // update the position of the daemon
    this._setDaemonPosition();
  }

  private _setDaemonPosition(): void {
    const top = this.$currentComponent?.getBoundingClientRect().top;
    const left = this.$currentComponent?.getBoundingClientRect().left;
    const width = this.$currentComponent?.getBoundingClientRect().width;
    const height = this.$currentComponent?.getBoundingClientRect().height;

    console.log('top', top);
    console.log('left', left);
    console.log('width', width);
    console.log('height', height);

    this.style.top = `${top}px`;
    this.style.left = `${left}px`;
    this.style.width = `${width}px`;
    this.style.height = `${height}px`;
  }

  public render() {
    return html`<div class="${this.cls('_inner')}">
      <div class="${this.cls('_tools')}">
        <div class="${this.cls('_tool')}">Edit</div>
      </div>
    </div> `;
  }
}
