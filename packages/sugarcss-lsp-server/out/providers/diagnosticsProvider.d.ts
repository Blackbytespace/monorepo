import { TextDocument } from 'vscode-languageserver-textdocument';
import { Diagnostic } from 'vscode-languageserver/node';
interface CSSLanguageServerSettings {
    maxNumberOfProblems: number;
    enableCompletion: boolean;
    enableHover: boolean;
    enableDiagnostics: boolean;
}
export declare class CSSDiagnosticsProvider {
    private validAtRules;
    private cssRules;
    private validCSSUnits;
    private validCSSProperties;
    getDiagnostics(document: TextDocument, settings: CSSLanguageServerSettings): Diagnostic[];
    private validateAtRules;
}
export {};
//# sourceMappingURL=diagnosticsProvider.d.ts.map