import * as path from 'path';
import { ExtensionContext, window, workspace } from 'vscode';

import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
  // The server is implemented in node
  const serverModule = context.asAbsolutePath(
    path.join('..', 'sugarcss-lsp-server', 'out', 'server.js'),
  );

  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: { execArgv: ['--nolazy', '--inspect=6009'] },
    },
  };

  // Options to control the language client
  const clientOptions: LanguageClientOptions = {
    // Register the server for CSS documents
    documentSelector: [{ scheme: 'file', language: 'css' }],
    synchronize: {
      // Notify the server about file changes to '.clientrc files contained in the workspace
      fileEvents: workspace.createFileSystemWatcher('**/.clientrc'),
    },
    // Pass the extension context to the server
    initializationOptions: {
      extensionPath: context.extensionPath,
    },
  };

  // Create the language client and start the client.
  client = new LanguageClient(
    'cssLanguageServer',
    'CSS Language Server',
    serverOptions,
    clientOptions,
  );

  // Register commands
  context.subscriptions.push(
    // Restart server command
    workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration('cssLanguageServer')) {
        window.showInformationMessage(
          'CSS Language Server configuration changed. Restart may be required.',
        );
      }
    }),
  );

  // Start the client. This will also launch the server
  client
    .start()
    .then(() => {
      console.log('CSS Language Server started successfully');
    })
    .catch((error: any) => {
      console.error('Failed to start CSS Language Server:', error);
      window.showErrorMessage(
        `Failed to start CSS Language Server: ${error.message}`,
      );
    });
}

export function deactivate(): Promise<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
