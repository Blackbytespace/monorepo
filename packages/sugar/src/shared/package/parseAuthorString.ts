/**
 * @name                    parseAuthorString
 * @namespace               shared.package
 * @type                    Function
 * @platform                js
 * @platform                node
 * @status                  stable
 *
 * This function simply take an author string like "Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)" and
 * transform it into a plain object with these properties: name, email and url
 *
 * @param       {String}          string          The string to parse
 * @return      {Object}                          The plain object version of the string
 *
 * @todo      tests
 *
 * @snippet         __parseAuthorString($1)
 *
 * @example       js
 * import { __parseAuthorString } from '@coffeekraken/sugar/package.js';
 *  __parseAuthorString("Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)")
 * // => {
 *   "name": "Olivier Bossel",
 *   "email": "olivier.bossel@gmail.com",
 *   "url": "https://olivierbossel.com"
 * }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
interface IParseAuthorStringResult {
  name: string;
  email: string;
  url: string;
}

export default function __parseAuthorString(
  string: string,
): IParseAuthorStringResult {
  const reg = /(.*)\s?<(.*)>\s?\((.*)\)/gm;
  const matches = reg.exec(string.trim());
  const authorObj: IParseAuthorStringResult = {
    name: matches?.[1]?.trim() ?? '',
    email: matches?.[2]?.trim() ?? '',
    url: matches?.[3]?.trim() ?? '',
  };
  return authorObj;
}
