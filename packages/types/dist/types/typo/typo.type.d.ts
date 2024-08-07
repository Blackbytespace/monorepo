import __Base from '../base/base.type.js';
import type { IRichTextSettings } from '@lotsof/sugar/faker';
export interface ITypo {
    text?: string;
    id?: string;
}
export default class Typo extends __Base {
    static mock(props?: ITypo, settings?: IRichTextSettings): Typo;
    constructor(props?: ITypo);
}
