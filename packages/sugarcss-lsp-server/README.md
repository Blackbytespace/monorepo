# CSS Language Server

A comprehensive TypeScript-based Language Server Protocol (LSP) implementation for CSS-based languages. This server provides rich language features including autocomplete, syntax highlighting, and inline documentation for CSS development.

## Features

✅ **Intelligent Autocomplete**
- CSS property suggestions with descriptions
- CSS value suggestions based on property context
- CSS function suggestions (rgb, calc, var, etc.)
- Pseudo-class and pseudo-element suggestions
- Context-aware completions

✅ **Hover Documentation**
- Property documentation with MDN links
- CSS function documentation with syntax examples
- Color value information
- Unit explanations
- Real-time syntax information

✅ **Diagnostics & Error Detection**
- Syntax error detection
- Unknown property warnings
- Invalid unit validation
- Color format validation
- Missing semicolon detection
- Empty property value warnings

✅ **Editor Agnostic**
- Works with any LSP-compatible editor
- VS Code integration ready
- Vim/Neovim compatible
- Emacs compatible
- Sublime Text compatible

## Installation

### Prerequisites

- Node.js 16.0.0 or higher
- npm or yarn package manager

### Building from Source

```bash
# Clone the repository (if applicable)
# cd css-language-server

# Install dependencies
npm install

# Build the project
npm run build

# Start the language server
npm start
```

## Usage

### VS Code Integration

To use this language server with VS Code, you'll need to create a VS Code extension or configure a generic LSP client. Here's a basic configuration:

1. **Install a generic LSP extension** like [vscode-languageclient](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-languageserver-node)

2. **Configure the language server** in your VS Code settings:

```json
{
  "languageServerExample.trace.server": "verbose",
  "languageServerExample.maxNumberOfProblems": 100
}
```

### Vim/Neovim Integration

For Vim/Neovim, use a plugin like [coc.nvim](https://github.com/neoclide/coc.nvim) or [vim-lsp](https://github.com/prabirshrestha/vim-lsp):

#### With coc.nvim:

Add to your `coc-settings.json`:

```json
{
  "languageserver": {
    "css-language-server": {
      "command": "node",
      "args": ["/path/to/css-language-server/out/server.js", "--stdio"],
      "filetypes": ["css", "scss", "less"]
    }
  }
}
```

#### With vim-lsp:

Add to your `.vimrc`:

```vim
if executable('node')
    au User lsp_setup call lsp#register_server({
        \\ 'name': 'css-language-server',
        \\ 'cmd': {server_info->['node', '/path/to/css-language-server/out/server.js', '--stdio']},
        \\ 'allowlist': ['css', 'scss', 'less'],
        \\ })
endif
```

### Emacs Integration

With [lsp-mode](https://github.com/emacs-lsp/lsp-mode):

```elisp
(lsp-register-client
 (make-lsp-client :new-connection (lsp-stdio-connection '("node" "/path/to/css-language-server/out/server.js" "--stdio"))
                  :major-modes '(css-mode scss-mode less-css-mode)
                  :server-id 'css-language-server))
```

## Development

### Project Structure

```
css-language-server/
├── src/
│   ├── server.ts                 # Main LSP server implementation
│   └── providers/
│       ├── completionProvider.ts # Autocomplete functionality
│       ├── hoverProvider.ts      # Hover documentation
│       └── diagnosticsProvider.ts # Error detection and validation
├── out/                          # Compiled JavaScript output
├── .vscode/
│   └── tasks.json               # VS Code build tasks
├── package.json                 # Project dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

### Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run watch` - Watch mode for development
- `npm start` - Start the language server
- `npm run clean` - Clean build artifacts
- `npm run dev` - Build and start in one command

### Building

The project uses TypeScript and compiles to CommonJS modules in the `out/` directory.

```bash
# Development build with watch mode
npm run watch

# Production build
npm run build
```

### VS Code Tasks

The project includes VS Code tasks for common development operations:

- **Build CSS Language Server** - Compile the project
- **Watch CSS Language Server** - Start watch mode
- **Start CSS Language Server** - Run the server
- **Clean CSS Language Server** - Clean build artifacts

Access these via `Cmd/Ctrl + Shift + P` → "Tasks: Run Task"

## Configuration

The language server supports configuration through LSP client settings:

```json
{
  "cssLanguageServer": {
    "maxNumberOfProblems": 100,
    "enableCompletion": true,
    "enableHover": true,
    "enableDiagnostics": true
  }
}
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `maxNumberOfProblems` | number | 1000 | Maximum number of diagnostic problems to report |
| `enableCompletion` | boolean | true | Enable/disable autocomplete functionality |
| `enableHover` | boolean | true | Enable/disable hover documentation |
| `enableDiagnostics` | boolean | true | Enable/disable error detection |

## Supported CSS Features

### Properties
- Layout: `display`, `position`, `float`, `clear`
- Box Model: `width`, `height`, `margin`, `padding`, `border`
- Typography: `font-family`, `font-size`, `line-height`, `text-align`
- Colors: `color`, `background-color`, `opacity`
- Flexbox: `flex`, `justify-content`, `align-items`
- Grid: `grid`, `grid-template-columns`, `grid-gap`
- Transform & Animation: `transform`, `transition`, `animation`

### Functions
- Color: `rgb()`, `rgba()`, `hsl()`, `hsla()`
- Layout: `calc()`, `var()`
- Gradients: `linear-gradient()`, `radial-gradient()`
- Transform: `translate()`, `rotate()`, `scale()`

### Units
- Length: `px`, `em`, `rem`, `vh`, `vw`, `%`
- Angle: `deg`, `rad`, `grad`, `turn`
- Time: `s`, `ms`
- Resolution: `dpi`, `dpcm`, `dppx`

### Selectors
- Pseudo-classes: `:hover`, `:focus`, `:active`, `:nth-child()`
- Pseudo-elements: `::before`, `::after`, `::first-line`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Add tests for new features
- Update documentation for new functionality
- Ensure all builds pass before submitting PR

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Roadmap

- [ ] SCSS/Sass language support
- [ ] LESS language support
- [ ] CSS Modules support
- [ ] PostCSS plugin integration
- [ ] Custom property tracking
- [ ] Import/export analysis
- [ ] Performance optimizations
- [ ] Advanced diagnostics
- [ ] Code formatting support
- [ ] Refactoring capabilities

## Support

For issues, feature requests, or questions:

1. Check the [issues](../../issues) page
2. Create a new issue with detailed information
3. Provide minimal reproduction cases for bugs

## Acknowledgments

- [Language Server Protocol](https://microsoft.github.io/language-server-protocol/) specification
- [VS Code Language Server Extension Guide](https://code.visualstudio.com/api/language-extensions/language-server-extension-guide)
- [CSS Specification](https://www.w3.org/Style/CSS/) by W3C
- [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference) for documentation