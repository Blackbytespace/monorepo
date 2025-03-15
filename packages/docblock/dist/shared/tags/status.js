// @ts-nocheck
/**
 * @name              status
 * @namespace           shared.tags
 * @type              Function
 * @platform            node
 * @status              beta
 *
 * Parse the status tag
 *
 * @see       {Object}          data        The data object parsed in the string
 * @param       {ISDocblockBlockSettings}     blockSettings     The SDocblockBlock settings
 * @see      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function status(data, blockSettings) {
    if (!['alpha', 'beta', 'stable', 'deprecated'].indexOf(data.value)) {
        throw new Error(`The status tag value must be one of the following: "alpha", "beta", "stable", "deprecated" and you passed "${data.value}"`);
    }
    return data.value;
}
export default status;
//# sourceMappingURL=status.js.map