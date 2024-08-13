import __BaseType from '../base/base.type.js';

import type { IRichTextSettings } from '@lotsof/sugar/faker';
import { __richText } from '@lotsof/sugar/faker';

export interface ITypo {
  text?: string;
  id?: string;
}

export default class TypoType extends __BaseType {
  public static mock(
    props: ITypo = {},
    settings?: IRichTextSettings,
  ): TypoType {
    const text = __richText(settings);
    return new this({
      text,
      ...props,
    });
  }

  constructor(props: ITypo = {}) {
    super(props);
  }
}
