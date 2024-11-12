/**
 * @name                    parseAuthorString
 * @namespace               shared.package
 * @type                    Function
 * @platform                js
 * @platform                node
 * @status                  stable
 *
 * This function simply take an author string like "Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)" and
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
 * import { __parseAuthorString } from '@lotsof/sugar/package';
 *  __parseAuthorString("Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)")
 * // => {
 *   "name": "Olivier Bossel",
 *   "email": "olivier.bossel@gmail.com",
 *   "url": "https://olivierbossel.com"
 * }
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export type TParseAuthorStringResult = {
    name: string;
    email: string;
    url: string;
};
export default function __parseAuthorString(string: string): TParseAuthorStringResult;
