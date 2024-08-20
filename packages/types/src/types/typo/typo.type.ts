import __BaseType from '../base/base.type.js';

import type { TRichTextSettings } from '@lotsof/sugar/faker';
import { __richText } from '@lotsof/sugar/faker';

export type TTypoProps = {
  text?: string;
  id?: string;
};

export default class TypoType extends __BaseType {
  public static mock(
    props: TTypoProps = {},
    settings?: TRichTextSettings,
  ): TypoType {
    const text = __richText(settings);
    return new this({
      text,
      ...props,
    });
  }

  constructor(props: TTypoProps = {}) {
    super(props);
  }
}
