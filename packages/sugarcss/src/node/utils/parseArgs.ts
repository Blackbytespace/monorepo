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
  debug: boolean;
};

export default function parseArgs(
  args: any[],
  schema: string[] = [],
  settings?: Partial<TParseArgsSettings>,
): TParseArgsResult {
  const finalSettings: TParseArgsSettings = {
    separator: ['comma'],
    resolve: true,
    debug: false,
    ...(settings ?? {}),
  };

  if (!finalSettings.separator.length) {
    finalSettings.separator = ['comma'];
  }

  const separators = Array.isArray(finalSettings.separator)
    ? finalSettings.separator
    : [finalSettings.separator];

  const resultArgs = {};

  let dashedArg: string,
    wasFunction: boolean = false;

  let argId = 0,
    currentProp = schema?.[argId] ?? `arg${argId}`;

  const handleArg = (arg) => {
    if (finalSettings.debug) {
      console.log('arg:', arg);
    }

    // some tokens to avoid
    const avoid = [
      'parenthesis-block',
      'close-parenthesis',
      'comment',
      'colon',
      'semicolon',
    ];
    if (!separators.includes('white-space')) {
      avoid.push('white-space');
    }

    if (avoid.includes(arg.value.type)) {
      return;
    }

    if (separators.includes(arg.value.type)) {
      dashedArg = '';
      argId++;
      if (finalSettings.debug) {
        console.log('separator');
      }
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

          if (finalSettings.debug) {
            console.log('function', currentProp, v);
          }

          // get the raw value
          arg.rawValue = v.raw ?? v;

          // set the resulting value
          __set(resultArgs, currentProp, arg);
          // update current prop
          currentProp = schema?.[argId + 1] ?? `arg${argId + 1}`;
          argId++;
        }

        break;
      default:
        if (finalSettings.debug) {
          console.log('h', currentProp, arg);
        }

        // get the raw value
        arg.rawValue = arg.value.value;

        // handle others
        __set(resultArgs, currentProp, arg);
    }
  };

  for (let [i, arg] of args.entries()) {
    handleArg(arg);
  }

  const values = __parsedArgsToRawValues(resultArgs);
  return {
    ast: resultArgs,
    values,
  };
}
