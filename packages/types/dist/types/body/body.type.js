import __BaseType from '../base/base.type.js';
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
 * @param           {TBody}           [props]           An object containing the properties of the Body type.
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
export default class __BodyType extends __BaseType {
    constructor(props = {}) {
        super();
        this.data = {
            suptitle: '',
            title: '',
            subtitle: '',
            lead: '',
            text: '',
            buttons: [],
            titleLevel: 3,
            subtitleLevel: 4,
            suptitleLevel: 5,
        };
        this.data = Object.assign(Object.assign({}, this.data), props);
    }
}
//# sourceMappingURL=body.type.js.map