import __Base from '../base/base.type.js';
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
    get suptitle() {
        return this.suptitle;
    }
    get title() {
        return this.title;
    }
    get subtitle() {
        return this.subtitle;
    }
    get lead() {
        return this.lead;
    }
    get text() {
        return this.text;
    }
    get buttons() {
        return this.buttons;
    }
    get typoClasses() {
        return this.typoClasses;
    }
    get subtitleLevel() {
        return this.subtitleLevel;
    }
    get titleLevel() {
        return this.titleLevel;
    }
    get suptitleLevel() {
        return this.suptitleLevel;
    }
    constructor(props = {}) {
        super(props);
        this._suptitle = '';
        this._title = '';
        this._subtitle = '';
        this._lead = '';
        this._text = '';
        this._buttons = [];
        this._typoClasses = true;
        this._subtitleLevel = 4;
        this._titleLevel = 3;
        this._suptitleLevel = 5;
    }
    toDomElement() {
        var _a, _b, _c, _d;
        const $div = document.createElement('div');
        $div.classList.add('body');
        if (this.typoClasses) {
            $div.classList.add('typo-format', 'typo-rhythm');
        }
        if (this.suptitle) {
            const $suptitle = document.createElement(`h${(_a = this.suptitleLevel) !== null && _a !== void 0 ? _a : 1}`);
            $suptitle.classList.add(`_suptitle`);
            if (this.typoClasses) {
                $suptitle.classList.add(`typo-h${this.suptitleLevel}`);
            }
            $suptitle.innerHTML = this.suptitle;
            $div.appendChild($suptitle);
        }
        if (this.title) {
            const $title = document.createElement(`h${(_b = this.titleLevel) !== null && _b !== void 0 ? _b : 1}`);
            $title.classList.add('_title');
            if (this.typoClasses) {
                $title.classList.add(`typo-h${this.titleLevel}`);
            }
            $title.innerHTML = this.title;
            $div.appendChild($title);
        }
        if (this.subtitle) {
            const $subtitle = document.createElement(`h${(_c = this.subtitleLevel) !== null && _c !== void 0 ? _c : 1}`);
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
            (_d = this.buttons) === null || _d === void 0 ? void 0 : _d.forEach((button) => {
                console.log('button', button);
                if (button.toDomElement) {
                    $buttons.appendChild(button.toDomElement());
                }
                else if (button.outerHTML) {
                    $buttons.appendChild(button);
                }
                else {
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
//# sourceMappingURL=body.type.js.map