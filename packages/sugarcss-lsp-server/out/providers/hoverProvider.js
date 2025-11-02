"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSSHoverProvider = void 0;
const docmap_json_1 = __importDefault(require("@blackbyte/sugarcss/docmap.json"));
const node_1 = require("vscode-languageserver/node");
const sugarcssFunctions = [];
for (let [namespace, docmapItem] of Object.entries(docmap_json_1.default.generated?.map || {})) {
    if (docmapItem.type?.raw?.toLowerCase() === 'function') {
        sugarcssFunctions.push([
            `${docmapItem.name}`,
            {
                name: docmapItem.name,
                description: docmapItem.description || '',
                syntax: `${docmapItem.name}()`,
                examples: docmapItem.example.map((example) => {
                    return example.code || '';
                }) || [],
                since: docmapItem.since || '',
            },
        ]);
    }
}
const sugarcssAtRules = [];
for (let [namespace, docmapItem] of Object.entries(docmap_json_1.default.generated?.map || {})) {
    if (docmapItem.type?.raw?.toLowerCase() === 'atrule') {
        sugarcssAtRules.push([
            `@${docmapItem.name}`,
            {
                name: docmapItem.name,
                description: docmapItem.description || '',
                syntax: `${docmapItem.name}()`,
                examples: docmapItem.example.map((example) => {
                    return example.code || '';
                }) || [],
                since: docmapItem.since || '',
            },
        ]);
    }
}
class CSSHoverProvider {
    constructor() {
        this.cssAtRuleInfo = new Map(sugarcssAtRules);
        // private cssPropertyInfo: Map<string, CSSPropertyInfo> = new Map([]);
        this.cssFunctionInfo = new Map(sugarcssFunctions);
        // private getColorHover(word: string, range: Range): Hover | null {
        //   // Check for hex colors
        //   if (/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(word)) {
        //     return {
        //       contents: {
        //         kind: MarkupKind.Markdown,
        //         value: `**Hex Color:** \`${word}\`\n\nA hexadecimal color value representing RGB components.`,
        //       },
        //       range,
        //     };
        //   }
        //   // Check for named colors
        //   const namedColors = [
        //     'red',
        //     'blue',
        //     'green',
        //     'yellow',
        //     'orange',
        //     'purple',
        //     'pink',
        //     'brown',
        //     'black',
        //     'white',
        //     'gray',
        //     'transparent',
        //   ];
        //   if (namedColors.includes(word.toLowerCase())) {
        //     return {
        //       contents: {
        //         kind: MarkupKind.Markdown,
        //         value: `**Named Color:** \`${word}\`\n\nA CSS named color value.`,
        //       },
        //       range,
        //     };
        //   }
        //   return null;
        // }
        // private getUnitHover(word: string, range: Range): Hover | null {
        //   const unitMatch = word.match(
        //     /^(\d+(?:\.\d+)?)(px|em|rem|%|vh|vw|vmin|vmax|ch|ex|cm|mm|in|pt|pc|deg|rad|grad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)$/,
        //   );
        //   if (unitMatch) {
        //     const [, value, unit] = unitMatch;
        //     const unitDescriptions: { [key: string]: string } = {
        //       px: 'Pixels - absolute length unit',
        //       em: 'Relative to the font-size of the element',
        //       rem: 'Relative to font-size of the root element',
        //       '%': 'Percentage relative to the parent element',
        //       vh: 'Viewport height (1% of viewport height)',
        //       vw: 'Viewport width (1% of viewport width)',
        //       vmin: 'Viewport minimum (1% of smaller viewport dimension)',
        //       vmax: 'Viewport maximum (1% of larger viewport dimension)',
        //       deg: 'Degrees (360 degrees = full circle)',
        //       rad: 'Radians (2π radians = full circle)',
        //       s: 'Seconds (time unit)',
        //       ms: 'Milliseconds (time unit)',
        //     };
        //     const description =
        //       unitDescriptions[unit] || `${unit.toUpperCase()} unit`;
        //     return {
        //       contents: {
        //         kind: MarkupKind.Markdown,
        //         value: `**${value}${unit}**\n\n${description}`,
        //       },
        //       range,
        //     };
        //   }
        //   return null;
        // }
    }
    getHover(document, position) {
        const wordRange = this.getWordRange(document, position);
        if (!wordRange) {
            return null;
        }
        const word = document.getText(wordRange);
        // Check if it's a CSS at-rule
        const atRuleInfo = this.cssAtRuleInfo.get(word);
        if (atRuleInfo) {
            return this.createAtRuleHover(atRuleInfo, wordRange);
        }
        // Check if it's a CSS property
        // const propertyInfo = this.cssPropertyInfo.get(word);
        // if (propertyInfo) {
        //   return this.createPropertyHover(propertyInfo, wordRange);
        // }
        // Check if it's a CSS function
        const functionInfo = this.cssFunctionInfo.get(word);
        if (functionInfo) {
            return this.createFunctionHover(functionInfo, wordRange);
        }
        // // Check for color values
        // const colorHover = this.getColorHover(word, wordRange);
        // if (colorHover) {
        //   return colorHover;
        // }
        // // Check for unit values
        // const unitHover = this.getUnitHover(word, wordRange);
        // if (unitHover) {
        //   return unitHover;
        // }
        return null;
    }
    getWordRange(document, position) {
        const line = document.getText({
            start: { line: position.line, character: 0 },
            end: { line: position.line, character: Number.MAX_SAFE_INTEGER },
        });
        const character = position.character;
        // Find word boundaries
        let start = character;
        let end = character;
        // Move start backward
        while (start > 0 && this.isWordCharacter(line[start - 1])) {
            start--;
        }
        // Move end forward
        while (end < line.length && this.isWordCharacter(line[end])) {
            end++;
        }
        if (start === end) {
            return null;
        }
        return {
            start: { line: position.line, character: start },
            end: { line: position.line, character: end },
        };
    }
    isWordCharacter(char) {
        return /[a-zA-Z0-9_@-]/.test(char);
    }
    createAtRuleHover(info, range) {
        let content = `**${info.name}**\n\n${info.description}`;
        if (info.syntax) {
            content += `\n\n**Syntax:**\n\`\`\`css\n${info.syntax}\n\`\`\``;
        }
        if (info.examples && info.examples.length > 0) {
            content += `\n\n**Examples:**\n\`\`\`css\n${info.examples.join('\n\n')}\n\`\`\``;
        }
        if (info.parameters && info.parameters.length > 0) {
            content += `\n\n**Common Parameters:** ${info.parameters.map((p) => `\`${p}\``).join(', ')}`;
        }
        if (info.since) {
            content += `\n\n**Since:** ${info.since}`;
        }
        return {
            contents: {
                kind: node_1.MarkupKind.Markdown,
                value: content,
            },
            range,
        };
    }
    createPropertyHover(info, range) {
        let content = `**${info.name}**\n\n${info.description}`;
        if (info.syntax) {
            content += `\n\n**Syntax:**\n\`\`\`css\n${info.syntax}\n\`\`\``;
        }
        if (info.examples && info.examples.length > 0) {
            content += `\n\n**Examples:**\n\`\`\`css\n${info.examples.join('\n')}\n\`\`\``;
        }
        if (info.values && info.values.length > 0) {
            content += `\n\n**Common Values:** ${info.values.map((v) => `\`${v}\``).join(', ')}`;
        }
        if (info.since) {
            content += `\n\n**Since:** ${info.since}`;
        }
        return {
            contents: {
                kind: node_1.MarkupKind.Markdown,
                value: content,
            },
            range,
        };
    }
    createFunctionHover(info, range) {
        let content = `**${info.name}()**\n\n${info.description}`;
        content += `\n\n**Syntax:**\n\`\`\`css\n${info.syntax}\n\`\`\``;
        if (info.examples && info.examples.length > 0) {
            content += `\n\n**Examples:**\n\`\`\`css\n${info.examples.join('\n')}\n\`\`\``;
        }
        if (info.since) {
            content += `\n\n**Since:** ${info.since}`;
        }
        return {
            contents: {
                kind: node_1.MarkupKind.Markdown,
                value: content,
            },
            range,
        };
    }
}
exports.CSSHoverProvider = CSSHoverProvider;
//# sourceMappingURL=hoverProvider.js.map