# CSS Language Server - VS Code Client

A VS Code extension that provides enhanced CSS language support through a dedicated Language Server Protocol (LSP) implementation.

## Features

- **Auto-completion**: Intelligent code completion for CSS properties, values, and selectors
- **Hover Information**: Detailed documentation on CSS properties and values
- **Diagnostics**: Real-time error detection and validation
- **Multi-language Support**: Works with CSS, SCSS, Sass, and Less files

## Installation

### Development Setup

1. Clone the repository
2. Navigate to the client directory:
   ```bash
   cd packages/lsp-vscode-client
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Compile the extension:
   ```bash
   npm run compile
   ```

### Running the Extension

1. Open VS Code
2. Press `F5` to open a new Extension Development Host window
3. Open a CSS file to test the language server features

## Configuration

The extension can be configured through VS Code settings:

- `cssLanguageServer.maxNumberOfProblems`: Maximum number of problems reported (default: 1000)
- `cssLanguageServer.enableCompletion`: Enable/disable code completion (default: true)
- `cssLanguageServer.enableHover`: Enable/disable hover information (default: true)
- `cssLanguageServer.enableDiagnostics`: Enable/disable diagnostics (default: true)
- `cssLanguageServer.trace.server`: Trace communication with the server (default: "off")

## Development

### Building

```bash
npm run compile
```

### Watching for Changes

```bash
npm run watch
```

### Linting

```bash
npm run lint
```

### Packaging

```bash
npm run package
```

## Architecture

This client connects to the CSS Language Server located in `../lsp-server`. The server provides:

- Code completion for CSS properties and values
- Hover documentation
- Diagnostic validation
- Support for CSS, SCSS, Sass, and Less

## Contributing

1. Make your changes
2. Test the extension using `F5` in VS Code
3. Run linting and tests
4. Submit a pull request

## License

MIT
