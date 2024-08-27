/**
 * @name            readXmlSync
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          stable
 *
 * This function allows you to read an xml file and get his content back as JSON
 *
 * @param       {String}           path            The xml file path to read
 * @return      {Object}                            The readed json
 *
 * @todo            tests
 *
 * @snippet         __readXmlSync($1)
 *
 * @example         js
 * import { __readXmlSync } from '@lotsof/sugar/fs';
 * __readXmlSync('my-cool-xml/file.xml');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __readXmlSync(path: string): any;
