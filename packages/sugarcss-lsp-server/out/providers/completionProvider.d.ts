import { TextDocument } from 'vscode-languageserver-textdocument';
import { CompletionItem, Position } from 'vscode-languageserver/node';
export declare class CSSCompletionProvider {
    private cssAtRules;
    private cssProperties;
    private cssFunctions;
    private cssUnits;
    private pseudoClasses;
    private pseudoElements;
    getCompletionItems(document: TextDocument, position: Position): CompletionItem[];
    private getCompletionContext;
    private getAtRuleCompletions;
    private getPropertyCompletions;
    private getValueCompletions;
    private getSelectorCompletions;
    private getFunctionCompletions;
    resolveCompletionItem(item: CompletionItem): CompletionItem;
}
//# sourceMappingURL=completionProvider.d.ts.map