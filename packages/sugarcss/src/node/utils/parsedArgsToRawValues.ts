// @ts-nocheck

import { __isPlainObject } from '@blackbyte/sugar/is';
import { __parse } from '@blackbyte/sugar/string';

export default function parsedArgsToRawValues(args: any): any {
  const rawValues: any = {};

  for (let [key, value] of Object.entries(args)) {
    if (__isPlainObject(value)) {
      if (value.rawValue !== undefined) {
        rawValues[key] = __parse(value.rawValue);
        delete value.rawValue;
        if (__isPlainObject(rawValues[key])) {
          rawValues[key] = parsedArgsToRawValues(rawValues[key]);
        }
      } else {
        rawValues[key] = parsedArgsToRawValues(value);
      }
    }
  }

  return rawValues;
}
