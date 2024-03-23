import __stripAnsi from 'strip-ansi';
import __deepMerge from '../object/deepMerge.js';
export default function __countLineChars(line, count = {}) {
    count = __deepMerge({
        htmlTags: false,
        terminalSpecialChars: false,
        newLineChars: false,
    }, count);
    let newLine = line;
    if (count.terminalSpecialChars === false) {
        newLine = __stripAnsi(newLine);
    }
    if (count.htmlTags === false) {
        newLine = newLine.replace(/<\/?[a-zA-Z0-9]+\s?\/?>/g, '');
    }
    if (count.newLineChars === false) {
        newLine = newLine.replace('\n', '');
    }
    return newLine.length;
}
//# sourceMappingURL=countLineChars.js.map