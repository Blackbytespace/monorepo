/**
 * @name                        splitEvery
 * @namespace                   shared.string
 * @type                        Function
 * @platform                    js
 * @platform                    node
 * @status                      stable
 *
 * Split a string every n chars either by taking care of not spliting the words, or by simply spliting without any attention to that...
 *
 * @param               {String}                  text                      The text to split
 * @param               {Number}                  every                     How many characters to split the text
 * @param               {Partial<TSplitEverySettings}       [settings={}]       Some settings to configure your split process
 * @return              {Array}                                             An array of the splited text parts
 *
 * @setting         {Boolean}           [splitWords=true]        If you want to split the words or not...
 *
 * @todo      tests
 *
 * @snippet         __splitEvery($1, $2)
 *
 * @example           js
 * import { __splitEvery } from '@lotsof/sugar/string';
 * __splitEvery('Hello World', 2, {
 *    splitWords: true
 * }); // => ['He','ll','o ','Wo','rl','d']
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
export type TSplitEverySettings = {
    splitWords: boolean;
};
export default function __splitEvery(text: string, every: number, settings?: Partial<TSplitEverySettings>): string[];
