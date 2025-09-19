// @ts-nocheck

/**
 * @name              changelog
 * @namespace           shared.tags
 * @type              Function
 * @platform            node
 * @status              beta
 *
 * Parse the changelog tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @param       {ISDocblockBlockSettings}     blockSettings     The SDocblockBlock settings
 * @example      {Object}                      The formated object
 *
 * @todo        interface
 * @todo        doc
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function changelog(data, blockSettings) {
  if (!Array.isArray(data)) data = [data];
  data = data
    .map((item) => {
      if (item.content && item.content[item.content.length - 1] === '') {
        item.content = item.content.slice(0, -1);
      }
      const parts = item.value.split(/\s{2,9999}|\t/).map((l) => l.trim());
      const description = Array.isArray(item.content)
        ? item.content?.join('\n').trim().replace(/\\@/, '@')
        : item.content?.trim().replace(/\\@/, '@');

      const result = {
        version: parts[0],
        description: description ?? parts[1],
      };

      return result;
    })
    .filter((item) => item !== null);

  return data;
}
export default changelog;
