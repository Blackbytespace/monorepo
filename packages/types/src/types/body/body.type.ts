import __Base from '../base/base.type.js';

export interface IBodyProps {
  suptitle?: string;
  title?: string;
  subtitle?: string;
  lead?: string;
  text?: string;
  buttons?: any[];
  titleLevel?: number;
  subtitleLevel?: number;
  suptitleLevel?: number;
}

/**
 * @name            Body
 * @namespace       types
 * @type            Class
 * @platform        ts
 * @platform        node
 * @status          beta
 *
 * This class is used to create a new instance of the Body type.
 *
 * @param           {IBodyProps}           [props]           An object containing the properties of the Body type.
 *
 * @property       {string}              [suptitle=null]       The suptitle of the body
 * @property       {string}              [title=null]          The title of the body
 * @property       {string}              [subtitle=null]       The subtitle of the body
 * @property       {string}              [lead=null]           The lead of the body
 * @property       {string}              [text=null]           The text of the body
 * @property       {any[]}               [buttons=null]        An array of buttons to display
 *
 * @example         ts
 * import { __Body } from '@lotsof/types';
 * const body = new __Body({
 *    title: 'Hello world',
 *    subtitle: 'This is a subtitle',
 *    lead: 'This is a lead',
 * });
 *
 * @since           1.0.0
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */

export default class __Body extends __Base {
  protected _suptitle: string = '';
  public get suptitle(): string {
    return this.suptitle;
  }

  protected _title: string = '';
  public get title(): string {
    return this.title;
  }

  protected _subtitle: string = '';
  public get subtitle(): string {
    return this.subtitle;
  }

  protected _lead: string = '';
  public get lead(): string {
    return this.lead;
  }

  protected _text: string = '';
  public get text(): string {
    return this.text;
  }

  protected _buttons: any[] = [];
  public get buttons(): any[] {
    return this.buttons;
  }

  protected _typoClasses: boolean = true;
  public get typoClasses(): boolean {
    return this.typoClasses;
  }

  protected _subtitleLevel: number = 4;
  public get subtitleLevel(): number {
    return this.subtitleLevel;
  }

  protected _titleLevel: number = 3;
  public get titleLevel(): number {
    return this.titleLevel;
  }

  protected _suptitleLevel: number = 5;
  public get suptitleLevel(): number {
    return this.suptitleLevel;
  }

  constructor(props: IBodyProps = {}) {
    super(props);
  }

  toDomElement(): HTMLElement {
    const $div = document.createElement('div');
    $div.classList.add('body');
    if (this.typoClasses) {
      $div.classList.add('typo-format', 'typo-rhythm');
    }

    if (this.suptitle) {
      const $suptitle = document.createElement(`h${this.suptitleLevel ?? 1}`);
      $suptitle.classList.add(`_suptitle`);
      if (this.typoClasses) {
        $suptitle.classList.add(`typo-h${this.suptitleLevel}`);
      }
      $suptitle.innerHTML = this.suptitle;
      $div.appendChild($suptitle);
    }

    if (this.title) {
      const $title = document.createElement(`h${this.titleLevel ?? 1}`);
      $title.classList.add('_title');
      if (this.typoClasses) {
        $title.classList.add(`typo-h${this.titleLevel}`);
      }
      $title.innerHTML = this.title;
      $div.appendChild($title);
    }

    if (this.subtitle) {
      const $subtitle = document.createElement(`h${this.subtitleLevel ?? 1}`);
      $subtitle.classList.add('_subtitle');
      if (this.typoClasses) {
        $subtitle.classList.add(`typo-h${this.subtitleLevel}`);
      }
      $subtitle.innerHTML = this.subtitle;
      $div.appendChild($subtitle);
    }

    if (this.lead) {
      const $lead = document.createElement('p');
      $lead.classList.add('_lead');
      if (this.typoClasses) {
        $lead.classList.add('typo-lead');
      }
      $lead.innerHTML = this.lead;
      $div.appendChild($lead);
    }

    if (this.text) {
      const $text = document.createElement('p');
      $text.classList.add('_text');
      if (this.typoClasses) {
        $text.classList.add('typo-p');
      }
      $text.innerHTML = this.text;
      $div.appendChild($text);
    }

    if (this.has('buttons')) {
      const $buttons = document.createElement('div');
      $buttons.classList.add('_buttons');
      this.buttons?.forEach((button) => {
        console.log('button', button);
        if (button.toDomElement) {
          $buttons.appendChild(button.toDomElement());
        } else if (button.outerHTML) {
          $buttons.appendChild(button);
        } else {
          throw new Error('Invalid button type');
        }
      });
      $div.appendChild($buttons);
    }

    return $div;
  }

  toHtml() {
    return `<div>
        <h1>Body</h1>
        </div>`;
  }
}
