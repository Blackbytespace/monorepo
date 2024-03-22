import __deepMerge from '../object/deepMerge.js';

/**
 * @name                    replaceTokens
 * @namespace               js.string
 * @type                    Function
 * @platform                js
 * @platform                node
 * @status                  stable
 *
 * This function takes as parameter a tokened string like "something [cool]", an object
 * of arguments/values and return the processed string with the tokens replaced by the arguments values.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      {Feature}     Add setting to define tokens delimiter
 * @todo      {Feature}     Support multi level tokens like [something.cool]
 *
 * @param       {String}          string          The string to process
 * @param       {Object}          argsObj         The arguments/value object
 * @param       {Object}          [settings={}]   A settings object to configure the parsing process
 * @return      {String}                          The processed string
 *
 * @setting     {String}        [regexp=\[([a-zA-Z0-9-_]+)\] The regexp to use to match the tokens
 * @setting     {Boolean}       [stripUndefined=true]       Specify if you want to strip the tokens that are not found in the argsObj
 *
 * @snippet         (string) __replaceTokens($1, $2)
 * __replaceTokens($1, $2)
 *
 * @todo      tests
 *
 * @example     js
 * import { __replaceTokens } from '@coffeekraken/sugar/string';
 * __replaceTokens('hello [world]', { world: 'Coco' }); // => hello Coco
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
interface IReplaceTokensSettings {
  regexp: string;
  stripUndefined: boolean;
}

function replaceTokens(
  string: string,
  argsObj: any,
  settings: IReplaceTokensSettings = {},
): string {
  settings = __deepMerge(
    {
      regexp: '\\[([a-zA-Z0-9-_]+)\\]',
      stripUndefined: true,
    },
    settings,
  );
  let tokens;
  const reg = new RegExp(settings.regexp, 'g');
  while ((tokens = reg.exec(string))) {
    if (argsObj[tokens[1]] === undefined && !settings.stripUndefined) return;
    string = string.replace(tokens[0], argsObj[tokens[1]] || '');
  }
  return string;
}
export default replaceTokens;
