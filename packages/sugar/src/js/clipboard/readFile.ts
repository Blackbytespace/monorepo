/**
 * @name                readFile
 * @namespace           js.clipboard
 * @type                Function
 * @platform            js
 * @async
 * @status              stable
 *
 * This function allows you to read the file copied to clipboard
 *
 * @return      {Promise}                          A promise fullfilled when the content has been read correctly
 *
 * @todo     tests
 *
 * @snippet         __readFile($1)
 *
 * @example         js
 * import { __readFile } from '@lotsof/sugar/clipboard';
 * await __readFile();
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default async function __readText(): Promise<any> {
  if (navigator?.clipboard?.read) {
    return navigator.clipboard.read();
  }
  return Promise.reject('The Clipboard API is not available.');
}
