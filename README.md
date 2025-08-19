# Gissy

If you find this project useful, please consider giving it a ⭐! Your support helps the project grow and reach more developers.

[![GitHub stars](https://img.shields.io/github/stars/exodus-tola-mindCoder/gissy?style=social)](https://github.com/exodus-tola-mindCoder/gissy)

<p align="center">
  <strong>A sophisticated CLI assistant to supercharge your Git workflow, powered by multiple AI providers.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/gissy"><img src="https://img.shields.io/npm/v/gissy.svg" alt="NPM Version"></a>
  <a href="https://github.com/exodus-tola-mindCoder/gissy/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome"></a>
  <a href="#"><img src="https://img.shields.io/badge/AI-OpenAI%20%7C%20Gemini%20%7C%20Addis%20AI-blue.svg" alt="AI Providers"></a>
</p>

<p align="center">
  <strong>This tool is proudly sponsored by <a href="https://platform.addisassistant.com/">Addis AI</a>.</strong>
</p>

---

**gissy** is an intelligent command-line tool that automates your most repetitive Git tasks. From providing an enhanced `git status` to watching your files, running quality checks, and generating insightful, AI-powered commit messages, gissy acts as your personal Git assistant so you can focus on coding.

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

- **Intelligent File Watcher**: Automatically detects file changes in your repository
- **Automated Workflow**: Runs your tests and linter, then stages, commits, and pushes your changes seamlessly
- **SSH Key Setup**: Automatic SSH key generation and GitHub configuration for seamless authentication
- **AI-Powered Commits**: Leverages multiple AI providers (OpenAI, Gemini, Addis AI) to generate meaningful and conventional commit messages from your code diffs
- **Multi-AI Provider Support**: Choose from OpenAI, Google Gemini, or Addis AI for local language support
- **Highly Configurable**: Customize every part of the workflow using a simple `.gissyrc.json` file in your project
- **Zero-Config Ready**: Works out of the box with sensible defaults for most projects
- **Cross-Platform**: Works on Windows, macOS, and Linux
- **Enhanced Git Commands**: Clean, colorful, and informative outputs for `status`, `info`, and `branch` commands
- **TypeScript Ready**: Built with modern JavaScript (ES modules) for better performance

## 🛠️ Installation

### Global Installation (Recommended)
```bash
npm install -g gissy
```

### Using npx (No Installation Required)
```bash
# Run gissy without installing
npx gissy status
npx gissy watch
npx gissy info
npx gissy ssh
```

### Local Development
```bash
git clone https://github.com/exodus-tola-mindCoder/gissy
cd gissy
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

### AI Provider Configuration
Gissy supports multiple AI providers for generating intelligent commit messages. Configure your preferred provider using environment variables:

#### Environment Variables
Create a `.env` file in your project root:

```bash
# OpenAI (default priority)
OPENAI_API_KEY=your_openai_api_key_here

# Google Gemini
GEMINI_API_KEY=your_gemini_api_key_here

# Addis AI (local languages support)
ADDIS_AI_API_KEY=your_addis_ai_api_key_here
```

#### Provider Priority
The system automatically detects which AI provider to use based on available API keys in this priority order:
1. **OpenAI** (if `OPENAI_API_KEY` is set)
2. **Google Gemini** (if `GEMINI_API_KEY` is set)  
3. **Addis AI** (if `ADDIS_AI_API_KEY` is set)

#### AI Provider Features
| Provider | Model | Languages | Special Features |
|----------|--------|-----------|------------------|
| **OpenAI** | GPT-3.5-turbo | English | Conventional commit format |
| **Gemini** | gemini-pro | Multiple | Advanced AI generation |
| **Addis AI** | addis-ai | Afaan Oromo, Amharic | Local language support |

### Multi-AI Provider Support Guide

#### Overview
Gissy  supports multiple AI providers for generating intelligent commit messages, including OpenAI, Gemini, and Addis AI.

#### Supported Providers

1. **OpenAI** - Standard GPT models for general commit messages
2. **Gemini** - Google's Gemini models for advanced AI generation
3. **Addis AI** - Local language support for Afaan Oromo and Amharic

#### Configuration Examples

##### .env file
```bash
# For OpenAI
OPENAI_API_KEY=sk-1234567890abcdef

# For Gemini
GEMINI_API_KEY=your-gemini-key-here

# For Addis AI (local languages)
ADDIS_AI_API_KEY=your-addis-ai-key-here
```

#### Features
- **Multi-language support**: Addis AI supports Afaan Oromo and Amharic
- **Automatic fallback**: Falls back to simple commit messages if no AI keys are available
- **Zero-config ready**: Works without any API keys
- **Cross-platform**: Works on Windows, macOS, and Linux

#### Migration Guide
##### From Single OpenAI to Multi-Provider
1. Add new environment variables as needed
2. No code changes required
3. System automatically detects available providers

##### Backward Compatibility
- Existing OPENAI_API_KEY continues to work
- No breaking changes to existing configurations
- Fallback to simple commit messages when no keys are available

### Configuration Options
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `branch` | string | "main" | Target branch for pushes |
| `runTests` | boolean | true | Run tests before committing |
| `runLint` | boolean | true | Run linting before committing |
| `useAI` | boolean | false | Use AI for commit messages |
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

# Show which AI provider is being used
gissy watch --verbose

# Generate and setup SSH key for GitHub
gissy ssh 

# Show help and all available commands
gissy --help

# Using npx (no installation required)
npx gissy status
npx gissy watch --use-ai
npx gissy info
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
   AI Commits: ❌
   Auto Commit: ❌
   Auto Push: ❌
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

# Using npx with all options
npx gissy watch --verbose --use-ai --ignore "*.log"
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
│   ├── ssh-handler.js         # SSH key generation and GitHub configuration
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
git clone https://github.com/exodus-tola-mindCoder/gissy.git
cd gissy
npm install
npm link  # For global CLI access during development
```
/// Git Repository Detection - The isGitRepository() function has specific checks that might fail in edge cases

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

# Run AI provider tests
npm test -- tests/unit/ai-providers.test.js
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
sudo npm install -g gissy
```

**Windows issues**
```bash
# Run as administrator or use Windows Terminal
npm install -g gissy
```

### Debug Mode
```bash
DEBUG=gissy gissy status
DEBUG=gissy gissy watch --verbose --use-ai
```

### AI Provider Issues
```bash
# Check which provider is being used
gissy watch --verbose

# Verify environment variables
echo $OPENAI_API_KEY
echo $GEMINI_API_KEY
echo $ADDIS_AI_API_KEY

# Test AI provider detection
node -e "import('./src/commit-message.js').then(m => console.log(m.getAvailableProviders()))"
```

### Multi-AI Provider Troubleshooting

#### Common Issues
1. **No AI messages generated**: Check if any API keys are configured
2. **Provider not detected**: Verify environment variable names
3. **Language issues**: Ensure Addis AI key is set for local languages

#### Debug Mode
```bash
DEBUG=gissy gissy watch --verbose
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Commander.js](https://github.com/tj/commander.js/) for CLI
- File watching powered by [Chokidar](https://github.com/paulmillr/chokidar)
- Configuration via [Cosmiconfig](https://github.com/davidtheclark/cosmiconfig)
- AI integration with [OpenAI](https://openai.com)
- Colorful output with [Chalk](https://github.com/chalk/chalk)

## 🚀 Roadmap

We have big plans for gissy! Here are some of the features we're looking to add in the future.

### 1. **Advanced Configuration**
- [ ] Custom commit message templates
- [ ] Multi-repository support
- [ ] Custom Git hooks

### 2. **Enhanced AI**
- [ ] Commit message validation
- [ ] User preference learning

### 3. **Platform Integration**
- [ ] Bitbucket pipeline support
- [ ] Azure DevOps integration

### 4. **User Experience**
- [ ] Color themes
- [ ] Progress bars for long-running tasks
- [ ] Detailed logging options

## ✍️ Author

**Exodus Tola**

- **GitHub**: [@exodus-tola-mindCoder](https://github.com/exodus-tola-mindCoder)
- **LinkedIn**: [Exodus Tola](https://www.linkedin.com/in/exodus-tola) 
- **X (Twitter)**: [@Exodus_Tola](https://x.com/Exodus_Tola)
- **Telegram**: [@Exodus_Tola](https://t.me/Exodus_Tola)
