import { TextDocument } from 'vscode-languageserver-textdocument';
import { Hover, Position } from 'vscode-languageserver/node';
export declare class CSSHoverProvider {
    private cssAtRuleInfo;
    private cssFunctionInfo;
    getHover(document: TextDocument, position: Position): Hover | null;
    private getWordRange;
    private isWordCharacter;
    private createAtRuleHover;
    private createPropertyHover;
    private createFunctionHover;
}
//# sourceMappingURL=hoverProvider.d.ts.map