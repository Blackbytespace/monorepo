import { __set } from '@lotsof/sugar/object';
import { env } from '../sugarcss.js';
import __toString from './toString.js';

import __parsedArgsToRawValues from './parsedArgsToRawValues.js';

export type TParseArgsResult = {
  ast: any;
  values: any;
};

export type TParseArgsSettings = {
  separator: string | string[];
  resolve: boolean;
};

export default function parseArgs(
  args: any[],
  schema: string[] = [],
  settings?: Partial<TParseArgsSettings>,
): TParseArgsResult {
  const finalSettings: TParseArgsSettings = {
    separator: ['comma'],
    resolve: true,
    ...(settings ?? {}),
  };

  const separators = Array.isArray(finalSettings.separator)
    ? finalSettings.separator
    : [finalSettings.separator];

  const resultArgs = {};

  let dashedArg: string;

  let argId = 0,
    currentProp = schema?.[argId] ?? `arg${argId}`;

  const handleArg = (arg) => {
    // some tokens to avoid
    const avoid = [
      'parenthesis-block',
      'close-parenthesis',
      'white-space',
      'comment',
      'colon',
      'semicolon',
    ];
    if (avoid.includes(arg.value.type)) {
      return;
    }

    if (separators.includes(arg.value.type)) {
      dashedArg = '';
      argId++;
      currentProp = schema?.[argId] ?? `arg${argId}`;
      return;
    }

    switch (arg.type) {
      case 'dashed-ident':
        // flag that we are in a dashed ident
        if (!dashedArg) {
          dashedArg = currentProp;
        }

        // handle dashed ident like (--darken 10) etc...
        if (resultArgs[dashedArg] === undefined) {
          resultArgs[dashedArg] = {};
        }
        currentProp = `${dashedArg}.${arg.value.replace(/-{1,2}/g, '')}`;

        break;
      case 'function':
        if (arg.value.name === 'cubic-bezier') {
          arg.rawValue = __toString(arg);
          __set(resultArgs, currentProp, arg);
        } else if (env.functions[arg.value.name]) {
          const v = env.functions[arg.value.name](arg.value);

          // get the raw value
          arg.rawValue = v.raw ?? v;

          __set(resultArgs, currentProp, arg);

          // set the new currentProp
          currentProp = schema?.[argId] ?? `arg${argId}`;
        }

        break;
      default:
        // get the raw value
        arg.rawValue = arg.value.value;

        // handle others
        __set(resultArgs, currentProp, arg);
    }
  };

  for (let [i, arg] of args.entries()) {
    handleArg(arg);
  }

  return {
    ast: resultArgs,
    values: __parsedArgsToRawValues(resultArgs),
  };
}
