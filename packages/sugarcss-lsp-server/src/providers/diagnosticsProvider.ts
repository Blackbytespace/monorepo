import sugarcssDocmapJson from '@blackbyte/sugarcss/docmap.json';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { Diagnostic, DiagnosticSeverity } from 'vscode-languageserver/node';

interface CSSLanguageServerSettings {
  maxNumberOfProblems: number;
  enableCompletion: boolean;
  enableHover: boolean;
  enableDiagnostics: boolean;
}

interface CSSRule {
  type: 'property' | 'selector' | 'value' | 'syntax';
  pattern: RegExp;
  message: string;
  severity: DiagnosticSeverity;
}

const sugarcssAtRules: string[] = [];
for (let [namespace, docmapItem] of Object.entries(
  sugarcssDocmapJson.generated?.map || {},
)) {
  if (docmapItem.type?.raw?.toLowerCase() === 'atrule') {
    sugarcssAtRules.push(`@${docmapItem.name}`);
  }
}

export class CSSDiagnosticsProvider {
  private validAtRules = new Set(sugarcssAtRules);

  private cssRules: CSSRule[] = [];

  private validCSSUnits = new Set([
    // 'px'
  ]);

  private validCSSProperties = new Set([
    // 'display'
  ]);

  getDiagnostics(
    document: TextDocument,
    settings: CSSLanguageServerSettings,
  ): Diagnostic[] {
    const diagnostics: Diagnostic[] = [];
    const text = document.getText();

    // Check for basic syntax errors
    // diagnostics.push(...this.validateSyntax(document, text));

    // Check for unknown properties
    // diagnostics.push(...this.validateProperties(document, text));

    // Check for unknown at-rules
    diagnostics.push(...this.validateAtRules(document, text));

    // Check for invalid units
    // diagnostics.push(...this.validateUnits(document, text));

    // Check for color values
    // diagnostics.push(...this.validateColors(document, text));

    // Check for missing values
    // diagnostics.push(...this.validateMissingValues(document, text));

    // Limit number of problems
    return diagnostics.slice(0, settings.maxNumberOfProblems);
  }

  private validateAtRules(document: TextDocument, text: string): Diagnostic[] {
    const diagnostics: Diagnostic[] = [];
    const lines = text.split('\n');

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex];

      // Match at-rules (starting with @)
      const atRuleMatch = line.match(/^\s*(@[a-zA-Z-]+)/);
      if (atRuleMatch) {
        const atRule = atRuleMatch[1];

        console.log('Found at-rule:', atRule);

        if (!this.validAtRules.has(atRule)) {
          console.log('Invalid at-rule detected:', atRule);

          const startChar = line.indexOf('@');
          const endChar = startChar + atRule.length;

          diagnostics.push({
            severity: DiagnosticSeverity.Error,
            range: {
              start: { line: lineIndex, character: startChar },
              end: { line: lineIndex, character: endChar },
            },
            message: `Unknown at-rule '${atRule}'`,
            source: 'css-language-server',
          });
        }
      }
    }

    return diagnostics;
  }

  // private validateSyntax(document: TextDocument, text: string): Diagnostic[] {
  //   const diagnostics: Diagnostic[] = [];

  //   // Check for unmatched braces
  //   const openBraces = (text.match(/{/g) || []).length;
  //   const closeBraces = (text.match(/}/g) || []).length;

  //   if (openBraces !== closeBraces) {
  //     const lastLine = document.lineCount - 1;
  //     const lastLineText = document.getText({
  //       start: { line: lastLine, character: 0 },
  //       end: { line: lastLine, character: Number.MAX_SAFE_INTEGER },
  //     });

  //     diagnostics.push({
  //       severity: DiagnosticSeverity.Error,
  //       range: {
  //         start: { line: lastLine, character: 0 },
  //         end: { line: lastLine, character: lastLineText.length },
  //       },
  //       message: 'Unmatched braces in CSS',
  //       source: 'css-language-server',
  //     });
  //   }

  //   return diagnostics;
  // }

  // private validateProperties(
  //   document: TextDocument,
  //   text: string,
  // ): Diagnostic[] {
  //   const diagnostics: Diagnostic[] = [];
  //   const lines = text.split('\n');

  //   for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
  //     const line = lines[lineIndex];
  //     const propertyMatch = line.match(/^\s*([a-zA-Z-]+)\s*:/);

  //     if (propertyMatch) {
  //       const property = propertyMatch[1];

  //       if (!this.validCSSProperties.has(property)) {
  //         const startChar = line.indexOf(property);
  //         diagnostics.push({
  //           severity: DiagnosticSeverity.Warning,
  //           range: {
  //             start: { line: lineIndex, character: startChar },
  //             end: { line: lineIndex, character: startChar + property.length },
  //           },
  //           message: `Unknown CSS property: ${property}`,
  //           source: 'css-language-server',
  //         });
  //       }
  //     }
  //   }

  //   return diagnostics;
  // }

  // private validateUnits(document: TextDocument, text: string): Diagnostic[] {
  //   const diagnostics: Diagnostic[] = [];
  //   const lines = text.split('\n');

  //   for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
  //     const line = lines[lineIndex];
  //     const unitRegex = /\b(\d+(?:\.\d+)?)([a-zA-Z]+)\b/g;
  //     let match;

  //     while ((match = unitRegex.exec(line)) !== null) {
  //       const [fullMatch, value, unit] = match;

  //       if (!this.validCSSUnits.has(unit.toLowerCase())) {
  //         const startChar = match.index + value.length;
  //         diagnostics.push({
  //           severity: DiagnosticSeverity.Error,
  //           range: {
  //             start: { line: lineIndex, character: startChar },
  //             end: { line: lineIndex, character: startChar + unit.length },
  //           },
  //           message: `Unknown CSS unit: ${unit}`,
  //           source: 'css-language-server',
  //         });
  //       }
  //     }
  //   }

  //   return diagnostics;
  // }

  // private validateColors(document: TextDocument, text: string): Diagnostic[] {
  //   const diagnostics: Diagnostic[] = [];
  //   const lines = text.split('\n');

  //   for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
  //     const line = lines[lineIndex];

  //     // Check hex colors
  //     const hexRegex = /#([0-9A-Fa-f]*)/g;
  //     let match;

  //     while ((match = hexRegex.exec(line)) !== null) {
  //       const hexValue = match[1];

  //       if (
  //         hexValue.length !== 3 &&
  //         hexValue.length !== 6 &&
  //         hexValue.length !== 8
  //       ) {
  //         diagnostics.push({
  //           severity: DiagnosticSeverity.Error,
  //           range: {
  //             start: { line: lineIndex, character: match.index },
  //             end: {
  //               line: lineIndex,
  //               character: match.index + match[0].length,
  //             },
  //           },
  //           message:
  //             'Invalid hex color format. Use #rgb, #rrggbb, or #rrggbbaa format.',
  //           source: 'css-language-server',
  //         });
  //       }
  //     }

  //     // Check RGB/RGBA functions
  //     const rgbRegex = /rgba?\([^)]*\)/g;
  //     while ((match = rgbRegex.exec(line)) !== null) {
  //       const rgbContent = match[0];
  //       const values = rgbContent
  //         .slice(rgbContent.indexOf('(') + 1, -1)
  //         .split(',');

  //       if (rgbContent.startsWith('rgb(') && values.length !== 3) {
  //         diagnostics.push({
  //           severity: DiagnosticSeverity.Error,
  //           range: {
  //             start: { line: lineIndex, character: match.index },
  //             end: {
  //               line: lineIndex,
  //               character: match.index + match[0].length,
  //             },
  //           },
  //           message: 'rgb() function requires exactly 3 values',
  //           source: 'css-language-server',
  //         });
  //       } else if (rgbContent.startsWith('rgba(') && values.length !== 4) {
  //         diagnostics.push({
  //           severity: DiagnosticSeverity.Error,
  //           range: {
  //             start: { line: lineIndex, character: match.index },
  //             end: {
  //               line: lineIndex,
  //               character: match.index + match[0].length,
  //             },
  //           },
  //           message: 'rgba() function requires exactly 4 values',
  //           source: 'css-language-server',
  //         });
  //       }
  //     }
  //   }

  //   return diagnostics;
  // }

  // private validateMissingValues(
  //   document: TextDocument,
  //   text: string,
  // ): Diagnostic[] {
  //   const diagnostics: Diagnostic[] = [];
  //   const lines = text.split('\n');

  //   for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
  //     const line = lines[lineIndex];

  //     // Check for properties without values
  //     const emptyPropertyMatch = line.match(/^\s*([a-zA-Z-]+)\s*:\s*;/);
  //     if (emptyPropertyMatch) {
  //       const property = emptyPropertyMatch[1];
  //       const colonIndex = line.indexOf(':');

  //       diagnostics.push({
  //         severity: DiagnosticSeverity.Warning,
  //         range: {
  //           start: { line: lineIndex, character: colonIndex + 1 },
  //           end: { line: lineIndex, character: line.indexOf(';') },
  //         },
  //         message: `Property '${property}' has no value`,
  //         source: 'css-language-server',
  //       });
  //     }

  //     // Check for missing semicolons
  //     const missingSemicolonMatch = line.match(
  //       /^\s*([a-zA-Z-]+)\s*:\s*([^;{}\n]+)$/,
  //     );
  //     if (missingSemicolonMatch && !line.includes('{') && !line.includes('}')) {
  //       const endChar = line.trimEnd().length;

  //       diagnostics.push({
  //         severity: DiagnosticSeverity.Error,
  //         range: {
  //           start: { line: lineIndex, character: endChar },
  //           end: { line: lineIndex, character: endChar },
  //         },
  //         message: 'Missing semicolon',
  //         source: 'css-language-server',
  //       });
  //     }
  //   }

  //   return diagnostics;
  // }
}
