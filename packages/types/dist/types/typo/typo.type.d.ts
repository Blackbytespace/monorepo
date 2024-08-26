import __BaseType from '../base/base.type.js';
import type { TRichTextSettings } from '@lotsof/sugar/faker';
export type TTypo = {
    text?: string;
    id?: string;
};
export default class TypoType extends __BaseType {
    static mock(props?: TTypo, settings?: TRichTextSettings): TypoType;
    constructor(props?: TTypo);
}
