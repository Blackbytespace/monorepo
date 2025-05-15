import __LitElement from '@lotsof/lit-element';
import { property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../../src/css/icon.element.css';

/**
 * @name                IconElement
 * @as                  Icon Element
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/iconElement.types.ts
 * @platform            html
 * @status              beta
 *
 * Simple icon element that allows you to use heroicons out of the box as well as custom icons for your project
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @import          import { define as __IconElementDefine } from '@lotsof/icon-element';
 *
 * @snippet         __IconElementDefine($1)
 *
 * @install           shell
 * npm i @lotsof/icon-element
 *
 * @install           js
 * import __SIconElement from '@lotsof/icon-element';
 * __SIconElement.define();
 *
 * @example         html            Simple example
 * <s-icon name="play" />
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class AdvancedSelectElement extends __LitElement {
  @property({ type: String })
  public name: string;

  @property({ type: String })
  public type: string = 'outline';

  @state({ type: String })
  public svg: string = '';

  constructor() {
    super('s-icon');
  }

  protected async mount() {
    const svg = await fetch(
        `https://raw.githubusercontent.com/tailwindlabs/heroicons/refs/heads/master/src/24/${this.type}/${this.name}.svg`,
      ),
      svgText = await svg.text();
    this.svg = svgText;
  }

  public render() {
    return unsafeHTML(this.svg);
  }
}
