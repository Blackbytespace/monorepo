import __LitElement from '@lotsof/lit-element';
import { html } from 'lit';
import '../css/carpenterDaemon.css';
export default class CarpenterDaemonElement extends __LitElement {
    constructor() {
        super('s-carpenter-daemon');
    }
    render() {
        return html `<div class="${this.cls()}">Hello daemon</div> `;
    }
}
//# sourceMappingURL=carpenterDeamon.element.js.map