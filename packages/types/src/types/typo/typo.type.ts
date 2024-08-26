import __BaseType from '../base/base.type.js';

import type { TRichTextSettings } from '@lotsof/sugar/faker';
import { __richText } from '@lotsof/sugar/faker';

export type TTypo = {
  text?: string;
  id?: string;
};

export default class TypoType extends __BaseType {
  public static mock(
    props: TTypo = {},
    settings?: TRichTextSettings,
  ): TypoType {
    const text = __richText(settings);
    return new this({
      text,
      ...props,
    });
  }

  constructor(props: TTypo = {}) {
    super(props);
  }
}
