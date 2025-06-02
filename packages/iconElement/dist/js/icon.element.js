var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    constructor() {
        super('s-icon');
        this.type = 'outline';
        this.provider = 'heroicons';
        this.providers = {
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
        this.svg = '';
    }
    firstUpdated(_changedProperties) {
        // add the provider class
        this.classList.add(`-${this.provider}`);
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('wfewf', this.name);
            // construct the url
            let url = this.providers[this.provider].url
                .replace('%type', this.type)
                .replace('%name', this.name);
            // fetch the actual icon svg
            const svg = yield fetch(url), svgText = yield svg.text();
            // set the svg
            this.svg = svgText;
        });
    }
    render() {
        return unsafeHTML(this.svg);
    }
}
__decorate([
    property({ type: String })
    // @ts-ignore
], AdvancedSelectElement.prototype, "name", void 0);
__decorate([
    property({ type: String })
], AdvancedSelectElement.prototype, "type", void 0);
__decorate([
    property({ type: String })
], AdvancedSelectElement.prototype, "provider", void 0);
__decorate([
    property({ type: Object })
], AdvancedSelectElement.prototype, "providers", void 0);
__decorate([
    state()
], AdvancedSelectElement.prototype, "svg", void 0);
//# sourceMappingURL=icon.element.js.map