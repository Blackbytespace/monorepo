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
 * import { __readJsonSync } from '@lotsof/sugar/fs';
 * __readJsonSync('my-cool-json/file.json');
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __readJsonSync(path: string): any;
