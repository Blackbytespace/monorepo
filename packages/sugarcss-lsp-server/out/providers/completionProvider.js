"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSSCompletionProvider = void 0;
const node_1 = require("vscode-languageserver/node");
class CSSCompletionProvider {
    constructor() {
        this.cssAtRules = [
            {
                name: '@media',
                description: 'Media queries for responsive design',
                syntax: '@media <media-query-list> { <rules> }',
            },
            {
                name: '@import',
                description: 'Import external stylesheets',
                syntax: '@import <url> [<media-query-list>];',
            },
            {
                name: '@keyframes',
                description: 'Define animation keyframes',
                syntax: '@keyframes <animation-name> { <keyframe-block-list> }',
            },
            {
                name: '@supports',
                description: 'Feature queries for browser support',
                syntax: '@supports <supports-condition> { <rules> }',
            },
            {
                name: '@font-face',
                description: 'Define custom fonts',
                syntax: '@font-face { <font-descriptor-list> }',
            },
            {
                name: '@charset',
                description: 'Specify character encoding',
                syntax: '@charset "<charset>";',
            },
            {
                name: '@namespace',
                description: 'Define XML namespaces',
                syntax: '@namespace [<namespace-prefix>] <namespace-url>;',
            },
            {
                name: '@page',
                description: 'Describe page box for print',
                syntax: '@page [<page-selector>] { <page-body> }',
            },
            {
                name: '@container',
                description: 'Container queries',
                syntax: '@container [<container-name>] <container-query> { <rules> }',
            },
            {
                name: '@layer',
                description: 'Cascade layers',
                syntax: '@layer [<layer-name>] { <rules> }',
            },
            {
                name: '@scope',
                description: 'Scoped styles',
                syntax: '@scope [(<scope-start>)] [to (<scope-end>)] { <rules> }',
            },
        ];
        this.cssProperties = [
            // Layout Properties
            {
                name: 'display',
                description: 'Sets the display type of an element',
                values: [
                    'block',
                    'inline',
                    'inline-block',
                    'flex',
                    'grid',
                    'none',
                    'table',
                ],
            },
        ];
        this.cssFunctions = [
            {
                name: 'rgb',
                description: 'RGB color function',
                syntax: 'rgb(red, green, blue)',
            },
        ];
        this.cssUnits = [
            'px',
            'em',
            'rem',
            '%',
            'vh',
            'vw',
            'vmin',
            'vmax',
            'ch',
            'ex',
            'cm',
            'mm',
            'in',
            'pt',
            'pc',
            'deg',
            'rad',
            'grad',
            'turn',
            's',
            'ms',
            'Hz',
            'kHz',
            'dpi',
            'dpcm',
            'dppx',
        ];
        this.pseudoClasses = [
            'hover',
            'focus',
            'active',
            'visited',
            'link',
            'disabled',
            'enabled',
            'checked',
            'first-child',
            'last-child',
            'nth-child',
            'nth-of-type',
            'first-of-type',
            'last-of-type',
            'only-child',
            'only-of-type',
            'empty',
            'target',
            'root',
            'not',
            'before',
            'after',
        ];
        this.pseudoElements = [
            'before',
            'after',
            'first-line',
            'first-letter',
            'selection',
            'backdrop',
            'placeholder',
            'marker',
            'file-selector-button',
        ];
    }
    getCompletionItems(document, position) {
        const text = document.getText();
        const offset = document.offsetAt(position);
        const lineText = document.getText({
            start: { line: position.line, character: 0 },
            end: { line: position.line, character: position.character },
        });
        // Determine context
        const context = this.getCompletionContext(lineText, position.character);
        switch (context.type) {
            case 'at-rule':
                return this.getAtRuleCompletions();
            case 'property':
                return this.getPropertyCompletions();
            case 'value':
                return this.getValueCompletions(context.property);
            case 'selector':
                return this.getSelectorCompletions();
            case 'function':
                return this.getFunctionCompletions();
            default:
                return [];
        }
    }
    getCompletionContext(lineText, character) {
        const beforeCursor = lineText.substring(0, character);
        // Check if we're starting an at-rule (typing @ at the beginning of line or after whitespace)
        if (/^\s*@\w*$/.test(beforeCursor.trim())) {
            return { type: 'at-rule' };
        }
        // Check if we're in a CSS rule block (after opening brace)
        const lastOpenBrace = beforeCursor.lastIndexOf('{');
        const lastCloseBrace = beforeCursor.lastIndexOf('}');
        if (lastOpenBrace > lastCloseBrace) {
            // We're inside a CSS rule block
            const colonIndex = beforeCursor.lastIndexOf(':');
            const semicolonIndex = beforeCursor.lastIndexOf(';');
            if (colonIndex > semicolonIndex) {
                // We're after a colon, suggesting values
                const propertyMatch = beforeCursor
                    .substring(Math.max(semicolonIndex, lastOpenBrace) + 1, colonIndex)
                    .trim();
                return { type: 'value', property: propertyMatch };
            }
            else {
                // We're suggesting property names
                return { type: 'property' };
            }
        }
        else {
            // We're outside rule blocks, suggesting selectors or at-rules
            if (beforeCursor.includes('(') && !beforeCursor.includes(')')) {
                return { type: 'function' };
            }
            return { type: 'selector' };
        }
    }
    getAtRuleCompletions() {
        return this.cssAtRules.map((atRule) => ({
            label: atRule.name,
            kind: node_1.CompletionItemKind.Keyword,
            detail: atRule.description,
            documentation: atRule.syntax,
            insertText: atRule.name,
            sortText: `0${atRule.name}`, // Prioritize at-rules
        }));
    }
    getPropertyCompletions() {
        return this.cssProperties.map((prop) => ({
            label: prop.name,
            kind: node_1.CompletionItemKind.Property,
            detail: prop.description,
            documentation: prop.syntax ? `Syntax: ${prop.syntax}` : undefined,
            insertText: `${prop.name}: `,
            sortText: prop.name,
        }));
    }
    getValueCompletions(property) {
        const items = [];
        if (property) {
            const cssProperty = this.cssProperties.find((p) => p.name === property);
            if (cssProperty && cssProperty.values) {
                items.push(...cssProperty.values.map((value) => ({
                    label: value,
                    kind: node_1.CompletionItemKind.Value,
                    detail: `Value for ${property}`,
                    insertText: value,
                })));
            }
        }
        // Add CSS functions
        items.push(...this.cssFunctions.map((func) => ({
            label: func.name,
            kind: node_1.CompletionItemKind.Function,
            detail: func.description,
            documentation: func.syntax,
            insertText: `${func.name}($1)`,
            insertTextFormat: node_1.InsertTextFormat.Snippet,
        })));
        // Add common color values
        items.push({
            label: 'transparent',
            kind: node_1.CompletionItemKind.Color,
            insertText: 'transparent',
        }, {
            label: 'inherit',
            kind: node_1.CompletionItemKind.Keyword,
            insertText: 'inherit',
        }, {
            label: 'initial',
            kind: node_1.CompletionItemKind.Keyword,
            insertText: 'initial',
        }, { label: 'unset', kind: node_1.CompletionItemKind.Keyword, insertText: 'unset' });
        return items;
    }
    getSelectorCompletions() {
        const items = [];
        // Add at-rules (they can appear at the top level)
        items.push(...this.cssAtRules.map((atRule) => ({
            label: atRule.name,
            kind: node_1.CompletionItemKind.Keyword,
            detail: atRule.description,
            documentation: atRule.syntax,
            insertText: atRule.name,
            sortText: `0${atRule.name}`, // Prioritize at-rules
        })));
        // Add pseudo-classes
        items.push(...this.pseudoClasses.map((pseudo) => ({
            label: `:${pseudo}`,
            kind: node_1.CompletionItemKind.Keyword,
            detail: `Pseudo-class selector`,
            insertText: `:${pseudo}`,
        })));
        // Add pseudo-elements
        items.push(...this.pseudoElements.map((pseudo) => ({
            label: `::${pseudo}`,
            kind: node_1.CompletionItemKind.Keyword,
            detail: `Pseudo-element selector`,
            insertText: `::${pseudo}`,
        })));
        return items;
    }
    getFunctionCompletions() {
        return this.cssFunctions.map((func) => ({
            label: func.name,
            kind: node_1.CompletionItemKind.Function,
            detail: func.description,
            documentation: func.syntax,
            insertText: func.name,
        }));
    }
    resolveCompletionItem(item) {
        // Add more detailed documentation if needed
        if (item.kind === node_1.CompletionItemKind.Property) {
            const property = this.cssProperties.find((p) => p.name === item.label);
            if (property) {
                item.documentation = {
                    kind: 'markdown',
                    value: `**${property.name}**\n\n${property.description}\n\n${property.syntax ? `Syntax: \`${property.syntax}\`` : ''}`,
                };
            }
        }
        return item;
    }
}
exports.CSSCompletionProvider = CSSCompletionProvider;
//# sourceMappingURL=completionProvider.js.map