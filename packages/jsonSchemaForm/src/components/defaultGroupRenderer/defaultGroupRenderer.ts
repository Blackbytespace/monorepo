import __LitElement from '@lotsof/lit-element';
import { html, PropertyValues } from 'lit';
import { customElement } from 'lit/decorators.js';

// @ts-ignore
@customElement('s-json-schema-form-default-group-renderer')
export default class CarpenterDefaultGroupRenderer extends __LitElement {
  constructor() {
    super('s-json-schema-form-default-group-renderer');
  }

  async mount() {}

  public firstUpdated(_changedProperties: PropertyValues): void {}

  protected render(): any {
    return html` <div class="${this.cls('_container')}"></div>`;
  }
}
