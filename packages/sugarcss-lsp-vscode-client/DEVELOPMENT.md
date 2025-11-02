# Development Guide

## VS Code LSP Client for CSS Language Server

This VS Code extension provides enhanced CSS language support by connecting to a dedicated Language Server Protocol (LSP) implementation.

## Quick Start

### 1. Build the LSP Server

```bash
cd ../lsp-server
npm install
npm run build
```

### 2. Build the Client

```bash
npm install
npm run compile
```

### 3. Run the Extension

1. Open VS Code
2. Press `F5` to launch the Extension Development Host
3. Open a CSS file (like `example.css`) to test features

## Features Provided

### Code Completion

- CSS properties and values
- **CSS at-rules** (@media, @keyframes, @supports, @import, etc.)
- Triggered by typing `.`, `#`, `@`, `:`, `-`, or space
- Context-aware suggestions

### Hover Information

- Detailed documentation for CSS properties
- **Comprehensive at-rule documentation** with syntax and examples
- Value explanations and usage examples
- MDN documentation links

### Diagnostics

- Real-time error detection
- Invalid property and value validation
- **Unknown at-rule detection**
- Syntax error reporting

### Multi-Language Support

- CSS (`.css`)
- SCSS (`.scss`)
- Sass (`.sass`)
- Less (`.less`)

### Supported At-Rules

- `@media` - Media queries for responsive design
- `@import` - Import external stylesheets
- `@keyframes` - Animation keyframes
- `@supports` - Feature queries
- `@font-face` - Custom font definitions
- `@charset` - Character encoding
- `@namespace` - XML namespaces
- `@page` - Print page formatting
- `@container` - Container queries (modern)
- `@layer` - Cascade layers (modern)
- `@scope` - Scoped styles (modern)

## Architecture

```
lsp-vscode-client/          # VS Code Extension
├── src/
│   └── extension.ts        # Main extension entry point
├── package.json            # Extension manifest
└── ...

../lsp-server/              # Language Server
├── src/
│   ├── server.ts          # Main server
│   └── providers/         # Feature providers
│       ├── completionProvider.ts
│       ├── hoverProvider.ts
│       └── diagnosticsProvider.ts
└── ...
```

## Configuration

The extension can be configured via VS Code settings:

```json
{
  "cssLanguageServer.maxNumberOfProblems": 1000,
  "cssLanguageServer.enableCompletion": true,
  "cssLanguageServer.enableHover": true,
  "cssLanguageServer.enableDiagnostics": true,
  "cssLanguageServer.trace.server": "off"
}
```

## Debugging

### Client Debugging

1. Set breakpoints in `src/extension.ts`
2. Press `F5` to launch debug session
3. Debug information appears in VS Code's Debug Console

### Server Debugging

1. Enable server tracing: `"cssLanguageServer.trace.server": "verbose"`
2. View communication in Output panel (CSS Language Server channel)
3. Server logs appear in the Extension Development Host's Debug Console

### Common Issues

**Extension not activating:**

- Check that the LSP server is built (`../lsp-server/out/server.js` exists)
- Verify the server path in `src/extension.ts`

**No language features working:**

- Ensure you're working with supported file types (`.css`, `.scss`, `.sass`, `.less`)
- Check the Output panel for error messages
- Verify server communication with trace logging

**Compilation errors:**

- Run `npm run compile` to check for TypeScript errors
- Ensure all dependencies are installed

## Testing

Open `example.css` and test:

1. **Completion**:
   - Type `background-c` and see completion suggestions
   - Type `@med` and see `@media` completion
   - Type `@key` and see `@keyframes` completion
2. **Hover**:
   - Hover over CSS properties for documentation
   - Hover over at-rules like `@media`, `@keyframes` for detailed info
3. **Diagnostics**:
   - The intentional typo `colr: red;` should show an error
   - The unknown `@unknown-rule` should show an error

## Packaging

To create a `.vsix` package:

```bash
npm run package
```

Install the package:

```bash
code --install-extension css-language-client-1.0.0.vsix
```

## Development Workflow

1. Make changes to the client or server
2. Rebuild affected components:

   ```bash
   # For client changes
   npm run compile

   # For server changes
   cd ../lsp-server && npm run build
   ```

3. Reload the Extension Development Host (`Ctrl+R` / `Cmd+R`)
4. Test the changes

## Contributing

1. Follow the existing code style
2. Test all language features after changes
3. Update documentation for new features
4. Ensure both client and server build without errors
