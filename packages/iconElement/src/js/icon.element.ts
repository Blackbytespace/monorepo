import __LitElement from '@lotsof/lit-element';
import { PropertyValues } from 'lit';
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
  // @ts-ignore
  public name: string;

  @property({ type: String })
  public type: string = 'outline';

  @property({ type: String })
  public provider: string = 'heroicons';

  @property({ type: Object })
  public providers = {
    heroicons: {
      name: 'Heroicons',
      url: 'https://cdn.jsdelivr.net/gh/tailwindlabs/heroicons@2.2.0/src/24/%type/%name.svg',
    },
    fontawesome: {
      name: 'FontAwesome',
      url: 'https://cdn.jsdelivr.net/gh/FortAwesome/Font-Awesome@6.x/svgs/%type/%name.svg',
    },
    pixelarticons: {
      name: 'PixelArtIcons',
      url: 'https://cdn.jsdelivr.net/gh/halfmage/pixelarticons@master/svg/%name.svg',
    },
  };

  @state()
  public svg: string = '';

  constructor() {
    super('s-icon');
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    // add the provider class
    this.classList.add(`-${this.provider}`);
  }

  public update(changedProperties: PropertyValues): void {
    super.update(changedProperties);

    // if the name has changed, we need to remount
    if (changedProperties.has('name')) {
      this._updateIcon();
    }
  }

  private async _updateIcon(): Promise<void> {
    // construct the url
    let url: string = this.providers[this.provider].url
      .replace('%type', this.type)
      .replace('%name', this.name);

    // fetch the actual icon svg
    const svg = await fetch(url),
      svgText = await svg.text();

    // set the svg
    this.svg = svgText;
  }

  protected async mount() {
    this._updateIcon();
  }

  public render() {
    return unsafeHTML(this.svg);
  }
}
