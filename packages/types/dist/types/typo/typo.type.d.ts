import __BaseType from '../base/base.type.js';
import type { TRichTextSettings } from '@lotsof/sugar/faker';
export type TTypoProps = {
    text?: string;
    id?: string;
};
export default class TypoType extends __BaseType {
    static mock(props?: TTypoProps, settings?: TRichTextSettings): TypoType;
    constructor(props?: TTypoProps);
}
