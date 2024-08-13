import __BaseType from '../base/base.type.js';
import type { IRichTextSettings } from '@lotsof/sugar/faker';
export interface ITypo {
    text?: string;
    id?: string;
}
export default class TypoType extends __BaseType {
    static mock(props?: ITypo, settings?: IRichTextSettings): TypoType;
    constructor(props?: ITypo);
}
