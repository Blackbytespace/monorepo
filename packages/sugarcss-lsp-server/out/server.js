"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documents = exports.connection = void 0;
const node_1 = require("vscode-languageserver/node");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const completionProvider_1 = require("./providers/completionProvider");
const diagnosticsProvider_1 = require("./providers/diagnosticsProvider");
const hoverProvider_1 = require("./providers/hoverProvider");
// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = (0, node_1.createConnection)(node_1.ProposedFeatures.all);
exports.connection = connection;
// Create a simple text document manager.
const documents = new node_1.TextDocuments(vscode_languageserver_textdocument_1.TextDocument);
exports.documents = documents;
let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = false;
let hasDiagnosticRelatedInformationCapability = false;
// Initialize providers
const completionProvider = new completionProvider_1.CSSCompletionProvider();
const hoverProvider = new hoverProvider_1.CSSHoverProvider();
const diagnosticsProvider = new diagnosticsProvider_1.CSSDiagnosticsProvider();
connection.onInitialize((params) => {
    const capabilities = params.capabilities;
    // Does the client support the `workspace/configuration` request?
    // If not, we fall back using global settings.
    hasConfigurationCapability = !!(capabilities.workspace && !!capabilities.workspace.configuration);
    hasWorkspaceFolderCapability = !!(capabilities.workspace && !!capabilities.workspace.workspaceFolders);
    hasDiagnosticRelatedInformationCapability = !!(capabilities.textDocument &&
        capabilities.textDocument.publishDiagnostics &&
        capabilities.textDocument.publishDiagnostics.relatedInformation);
    const result = {
        capabilities: {
            textDocumentSync: node_1.TextDocumentSyncKind.Incremental,
            // Tell the client that this server supports code completion.
            completionProvider: {
                resolveProvider: true,
                triggerCharacters: ['.', '#', '@', ':', '-', ' '],
            },
            // Support hover information
            hoverProvider: true,
        },
    };
    if (hasWorkspaceFolderCapability) {
        result.capabilities.workspace = {
            workspaceFolders: {
                supported: true,
            },
        };
    }
    return result;
});
connection.onInitialized(() => {
    if (hasConfigurationCapability) {
        // Register for all configuration changes.
        connection.client.register(node_1.DidChangeConfigurationNotification.type, undefined);
    }
    if (hasWorkspaceFolderCapability) {
        connection.workspace.onDidChangeWorkspaceFolders((_event) => {
            connection.console.log('Workspace folder change event received.');
        });
    }
});
// The global settings, used when the `workspace/configuration` request is not supported by the client.
// Please note that this is not the case when using this server with the client provided in this example
// but could happen with other clients.
const defaultSettings = {
    maxNumberOfProblems: 1000,
    enableCompletion: true,
    enableHover: true,
    enableDiagnostics: true,
};
let globalSettings = defaultSettings;
// Cache the settings of all open documents
const documentSettings = new Map();
connection.onDidChangeConfiguration((change) => {
    if (hasConfigurationCapability) {
        // Reset all cached document settings
        documentSettings.clear();
    }
    else {
        globalSettings = ((change.settings.cssLanguageServer || defaultSettings));
    }
    // Revalidate all open text documents
    documents.all().forEach(validateTextDocument);
});
function getDocumentSettings(resource) {
    if (!hasConfigurationCapability) {
        return Promise.resolve(globalSettings);
    }
    let result = documentSettings.get(resource);
    if (!result) {
        result = connection.workspace.getConfiguration({
            scopeUri: resource,
            section: 'cssLanguageServer',
        });
        documentSettings.set(resource, result);
    }
    return result;
}
// Only keep settings for open documents
documents.onDidClose((e) => {
    documentSettings.delete(e.document.uri);
});
// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent((change) => {
    validateTextDocument(change.document);
});
async function validateTextDocument(textDocument) {
    // Get the settings for this document
    const settings = await getDocumentSettings(textDocument.uri);
    if (!settings.enableDiagnostics) {
        return;
    }
    // Generate diagnostics
    const diagnostics = diagnosticsProvider.getDiagnostics(textDocument, settings);
    // Send the computed diagnostics to VS Code.
    connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}
connection.onDidChangeWatchedFiles((_change) => {
    // Monitored files have change in VS Code
    connection.console.log('We received a file change event');
});
// This handler provides the initial list of the completion items.
connection.onCompletion(async (_textDocumentPosition) => {
    const document = documents.get(_textDocumentPosition.textDocument.uri);
    if (!document) {
        return [];
    }
    const settings = await getDocumentSettings(_textDocumentPosition.textDocument.uri);
    if (!settings.enableCompletion) {
        return [];
    }
    return completionProvider.getCompletionItems(document, _textDocumentPosition.position);
});
// This handler resolves additional information for the item selected in
// the completion list.
connection.onCompletionResolve((item) => {
    return completionProvider.resolveCompletionItem(item);
});
// Handle hover requests
connection.onHover(async (params) => {
    const document = documents.get(params.textDocument.uri);
    if (!document) {
        return null;
    }
    const settings = await getDocumentSettings(params.textDocument.uri);
    if (!settings.enableHover) {
        return null;
    }
    return hoverProvider.getHover(document, params.position);
});
// Diagnostics are handled through the validateTextDocument function
// which sends diagnostics via connection.sendDiagnostics
// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);
// Listen on the connection
connection.listen();
//# sourceMappingURL=server.js.map