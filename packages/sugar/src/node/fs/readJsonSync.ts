import * as __fs from 'fs';

/**
 * @name            readJsonSync
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * This function allows you to read a json file
 *
 * @param       {String}           path            The json file path to read
 * @return      {Object}                            The readed json
 *
 * @todo            tests
 *
 * @snippet         __readJsonSync($1)
 *
 * @example         js
 * import { __readJsonSync } from '@blackbyte/sugar/fs';
 * __readJsonSync('my-cool-json/file.json');
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */

export default function __readJsonSync(path: string): any {
  if (!__fs.existsSync(path)) {
    throw new Error(
      `<red>[readJsonSync]</red> Sorry but the passed file path "<cyan>${path}</cyan>" does not exists...`,
    );
  }

  const jsonStr = __fs.readFileSync(path, 'utf8').toString();
  const json = JSON.parse(jsonStr);
  return json;
}
