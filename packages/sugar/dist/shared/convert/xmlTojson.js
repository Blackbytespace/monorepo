import { XMLParser } from 'fast-xml-parser';
/**
 * @name            xmlToJson
 * @namespace            shared.convert
 * @type            Function
 * @platform          js
 * @platform          node
 * @status              beta
 *
 * This function take a xml string as input and return a json object.
 *
 * @param       {String}            xml             The xml string to convert
 * @return      {Object}                            The corresponding json object
 *
 * @snippet         __xmlToJson($1)
 *
 * @example         js
 * import ( __xmlToJson ) from '@lotsof/sugar/convert';
 * __xmlToJson('...');
 *
 * @todo    tests
 *
 * @see             https://www.npmjs.com/package/fast-xml-parser
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __xmlToJson(xml) {
    const parser = new XMLParser();
    return parser.parse(xml);
}
//# sourceMappingURL=xmlTojson.js.map