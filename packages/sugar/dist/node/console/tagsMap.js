import __chalk from 'chalk';
__chalk.level = 3;
/**
 * @name                tagsMap
 * @namespace           node.console
 * @type                Object
 * @platform            node
 * @status              stable
 * @private
 *
 * Store the tag->function map used in ```parseHtml``` function for example
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
 */
const tagsMap = {
    black: (tag, content) => __chalk.black(content),
    red: (tag, content) => __chalk.red(content),
    green: (tag, content) => __chalk.green(content),
    yellow: (tag, content) => __chalk.yellow(content),
    blue: (tag, content) => __chalk.blue(content),
    magenta: (tag, content) => __chalk.magenta(content),
    cyan: (tag, content) => __chalk.cyan(content),
    white: (tag, content) => __chalk.white(content),
    grey: (tag, content) => __chalk.grey(content),
    bgBlack: (tag, content) => __chalk.bgBlack(content),
    bgRed: (tag, content) => __chalk.bgRed(content),
    bgGreen: (tag, content) => __chalk.bgGreen(content),
    bgYellow: (tag, content) => __chalk.bgYellow(content),
    bgBlue: (tag, content) => __chalk.bgBlue(content),
    bgMagenta: (tag, content) => __chalk.bgMagenta(content),
    bgCyan: (tag, content) => __chalk.bgCyan(content),
    bgWhite: (tag, content) => __chalk.bgWhite(content),
    bold: (tag, content) => __chalk.bold(content),
    dim: (tag, content) => __chalk.dim(content),
    italic: (tag, content) => __chalk.italic(content),
    underline: (tag, content) => __chalk.underline(content),
    strike: (tag, content) => __chalk.strikethrough(content),
    h1: (tag, content) => {
        return __chalk.underline(__chalk.bold(content)) + '\n\n';
    },
    h2: (tag, content) => {
        return __chalk.bold(content) + '\n';
    },
    date: (tag, content) => new Date().getDate().toString().padStart(2, '0') +
        '-' +
        (new Date().getMonth() + 1).toString().padStart(2, '0') +
        '-' +
        new Date().getFullYear().toString().padStart(2, '0'),
    time: (tag, content) => new Date().getHours().toString().padStart(2, '0') +
        ':' +
        new Date().getMinutes().toString().padStart(2, '0') +
        ':' +
        new Date().getMinutes().toString().padStart(2, '0'),
    day: (tag, content) => new Date().getDate().toString().padStart(2, '0'),
    days: (tag, content) => new Date().getDate().toString().padStart(2, '0'),
    month: (tag, content) => new Date().getMonth().toString().padStart(2, '0'),
    months: (tag, content) => new Date().getMonth().toString().padStart(2, '0'),
    year: (tag, content) => new Date().getFullYear().toString().padStart(2, '0'),
    years: (tag, content) => new Date().getFullYear().toString().padStart(2, '0'),
    hour: (tag, content) => new Date().getHours().toString().padStart(2, '0'),
    hours: (tag, content) => new Date().getHours().toString().padStart(2, '0'),
    minute: (tag, content) => new Date().getMinutes().toString().padStart(2, '0'),
    minutes: (tag, content) => new Date().getMinutes().toString().padStart(2, '0'),
    second: (tag, content) => new Date().getSeconds().toString().padStart(2, '0'),
    seconds: (tag, content) => new Date().getSeconds().toString().padStart(2, '0'),
    br: (tag, content) => '\n',
};
export default tagsMap;
//# sourceMappingURL=tagsMap.js.map