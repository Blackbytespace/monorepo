import __replaceTags from '../../shared/html/replaceTags.js';
import __tagsMap from './tagsMap.js';

/**
 * @name                    parseHtml
 * @namespace               node.console
 * @type                    Function
 * @platform                node
 * @status                  stable
 *
 * Parse the simple html tags to format the console message
 *
 * @param           {String|Array}                  message                 The message to format of an array of messages to format
 * @return          {String}                                          The formated message
 *
 * @todo        tests
 *
 * @snippet         __parseHtml($1)
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export default function __parseHtml(message) {
  let isArray = false;
  if (Array.isArray(message)) {
    isArray = true;
  } else {
    message = [message];
  }

  message = message.map((m) => {
    return __replaceTags(m, __tagsMap);
  });

  if (isArray) return message;
  return message[0];
}
