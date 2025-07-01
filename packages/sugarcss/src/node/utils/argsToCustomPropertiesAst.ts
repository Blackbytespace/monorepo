import { __dashCase } from '@blackbyte/sugar/string';

export default function argsToCustomPropertiesAst(
  name: string,
  args: any,
): any {
  const result: any[] = [];
  for (let [key, value] of Object.entries(args.ast)) {
    result.push({
      property: 'custom',
      value: {
        name: `${name}-${__dashCase(key)}`,
        value: [value],
      },
    });
  }

  return result;
}
