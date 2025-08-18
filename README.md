# Gissy

<p align="center">
  <strong>A powerful CLI assistant to supercharge your Git workflow.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@exodus-tola-mindcoder/gissy"><img src="https://img.shields.io/npm/v/@exodus-tola-mindcoder/gissy.svg" alt="NPM Version"></a>
  <a href="https://github.com/exodus-tola-mindCoder/Git-Assist/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome"></a>
</p>

---

**gissy** is a smart command-line tool designed to automate your repetitive Git tasks. From providing an enhanced `git status` to watching your files, running tests, and generating AI-powered commit messages, gissy is your personal Git assistant.

<p align="center">
<pre>
    ██████╗ ██╗███████╗███████╗██╗   ██╗
    ██╔════╝ ██║██╔════╝██╔════╝╚██╗ ██╔╝
    ██║  ███╗██║███████╗███████╗ ╚████╔╝
    ██║   ██║██║╚════██║╚════██║  ╚██╔╝
    ╚██████╔╝██║███████║███████║   ██║
     ╚═════╝ ╚═╝╚══════╝╚══════╝   ╚═╝

       Your personal Git assistant
</pre>
</p>

## ✨ Key Features

- **Enhanced Git Commands**: Clean, colorful, and informative outputs for `status`, `info`, and `branch` commands
- **Intelligent File Watcher**: Automatically detects file changes in your repository
- **Automated Workflow**: Runs your tests and linter, then stages, commits, and pushes your changes seamlessly
- **AI-Powered Commits**: Leverages OpenAI to generate meaningful and conventional commit messages from your code diffs
- **Highly Configurable**: Customize every part of the workflow using a simple `.gissyrc.json` file in your project
- **Zero-Config Ready**: Works out of the box with sensible defaults for most projects
- **Cross-Platform**: Works on Windows, macOS, and Linux
- **TypeScript Ready**: Built with modern JavaScript (ES modules) for better performance

## 🛠️ Installation

### Global Installation (Recommended)
```bash
npm install -g @exodus-tola-mindcoder/gissy
```

### Local Development
```bash
git clone https://github.com/exodus-tola-mindCoder/Git-Assist.git
cd Git-Assist
npm install
npm link  # Creates global symlink for local development
```

## ⚙️ Configuration

### Basic Configuration
Create a `.gissyrc.json` file in your project root:

```json
{
  "branch": "main",
  "runTests": true,
  "runLint": true,
  "useAI": false,
  "autoCommit": false,
  "autoPush": false,
  "testCommand": "npm test",
  "lintCommand": "npm run lint",
  "watchIgnore": [
    "*.tmp",
    "build/**",
    "dist/**",
    "node_modules/**",
    ".git/**",
    "*.log"
  ]
}
```

### Environment Variables
Create a `.env` file for OpenAI integration:
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

### Configuration Options
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `branch` | string | "main" | Target branch for pushes |
| `runTests` | boolean | true | Run tests before committing |
| `runLint` | boolean | true | Run linting before committing |
| `useAI` | boolean | false | Use OpenAI for commit messages |
| `autoCommit` | boolean | false | Skip confirmation for commits |
| `autoPush` | boolean | false | Skip confirmation for pushes |
| `testCommand` | string | "npm test" | Command to run tests |
| `lintCommand` | string | "npm run lint" | Command to run linting |
| `watchIgnore` | array | [] | Additional patterns to ignore |

## 📖 Usage

### Basic Commands

```bash
# Show enhanced git status with file changes
gissy status

# Show detailed repository information
gissy info

# List all branches with current indicator
gissy branch

# List remote branches
gissy branch --remote

# List all branches (local and remote)
gissy branch --all

# Start intelligent file watcher
gissy watch

# Show help and all available commands
gissy --help
```

### File Watcher Workflow

The file watcher automatically:
1. Monitors file changes in your repository
2. Runs tests and linting (if enabled)
3. Generates commit messages (AI or fallback)
4. Stages, commits, and pushes changes

```bash
$ gissy watch
👀 gissy - Enhanced File Watcher Started

🚀 gissy — automate your GitHub workflows

📁 Watching current directory for changes...
⚙️  Configuration:
   Tests: ✅
   Linting: ✅
   AI Commits: ✅
   Branch: main

📝 Modified: src/index.js
✅ All quality checks passed!
💭 AI commit message generated
🚀 Successfully committed and pushed changes!
```

### Advanced Usage

```bash
# Verbose logging during watch
gissy watch --verbose

# Custom ignore patterns
gissy watch --ignore "*.tmp" "build/**"

# Combined options
gissy watch --verbose --ignore "*.log" "dist/**"
```

## 🏗️ Project Structure

```
gissy/
├── bin/
│   └── gissy.js               # CLI entry point
├── src/
│   ├── index.js               # Main CLI commands and program setup
│   ├── git-operations.js      # Git command wrappers and utilities
│   ├── config.js              # Configuration management with cosmiconfig
│   ├── commit-message.js      # AI-powered and fallback commit message generation
│   ├── watcher.js             # File watching with chokidar
│   ├── test-runner.js         # Test and lint execution with proper error handling
│   ├── user-interaction.js    # CLI prompts and confirmations
│   └── ui.js                  # UI utilities and ASCII art
├── tests/
│   ├── unit/
│   │   └── git-operations.test.js
│   ├── integration/
│   │   └── cli.test.js
│   ├── config/
│   │   └── config.test.js
│   └── error-handling/
│       └── error.test.js
├── .gissyrc.example.json      # Configuration template
├── .env.example               # Environment variables template
├── package.json               # NPM package configuration
├── package-lock.json          # Dependency lock file
├── LICENSE                    # MIT License
└── README.md                  # This documentation
```

## 🔧 Development

### Prerequisites
- Node.js v16+
- Git
- NPM

### Development Setup
```bash
git clone https://github.com/exodus-tola-mindCoder/Git-Assist.git
cd Git-Assist
npm install
npm link  # For global CLI access during development
```

### Available Scripts
```bash
npm start          # Run CLI directly
npm test           # Run test suite
npm run lint       # Lint source code
npm run lint:fix   # Fix linting issues
npm run format     # Format code with prettier
```

### Adding New Commands
1. Open `src/index.js`
2. Add new command in `createCommand()` function
3. Implement handler function
4. Add tests in appropriate test directory
5. Update documentation

### Testing
```bash
# Run all tests
npm test

# Run specific test suites
npm test -- tests/unit/
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Add tests** for new functionality
5. **Run tests** (`npm test`)
6. **Lint your code** (`npm run lint`)
7. **Format your code** (`npm run format`)
8. **Submit a pull request**

### Contribution Guidelines
- Follow conventional commit messages
- Add tests for new features
- Update documentation
- Ensure all CI checks pass

## 🐛 Troubleshooting

### Common Issues

**Command not found after npm install -g**
```bash
# Check if global bin is in PATH
npm config get prefix
# Add to PATH if needed
```

**Permission errors on macOS/Linux**
```bash
sudo npm install -g @exodus-tola-mindcoder/gissy
```

**Windows issues**
```bash
# Run as administrator or use Windows Terminal
npm install -g @exodus-tola-mindcoder/gissy
```

### Debug Mode
```bash
DEBUG=gissy gissy status
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Commander.js](https://github.com/tj/commander.js/) for CLI
- File watching powered by [Chokidar](https://github.com/paulmillr/chokidar)
- Configuration via [Cosmiconfig](https://github.com/davidtheclark/cosmiconfig)
- AI integration with [OpenAI](https://openai.com)
- Colorful output with [Chalk](https://github.com/chalk/chalk)
