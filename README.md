# Git Assist

A production-ready CLI tool for enhanced git operations and repository management with automated workflows.

## 🚀 Features

- **Enhanced Status**: Get a clean, colorful overview of your repository status
- **Repository Info**: View detailed information about your current repository
- **Branch Management**: List and manage branches with additional context
- **Smart File Watcher**: Monitor file changes with automated testing, linting, and git operations
- **AI-Powered Commits**: Generate intelligent commit messages using OpenAI
- **Configurable Workflows**: Customize behavior with `.gitassistrc` configuration
- **Production Ready**: Built with modern Node.js best practices

## 📋 Requirements

- Node.js >= 16.0.0
- Git installed and accessible from command line
- Optional: OpenAI API key for AI-powered commit messages

## 🛠️ Installation

### Global Installation (Recommended)

```bash
npm install -g git-assist
```

### Local Development

```bash
git clone https://github.com/exodus-tola-mindCoder/Git-Assist.git
cd Git-Assist
npm install
npm link
```

## ⚙️ Configuration

Create a `.gitassistrc` file in your project root:

```json
{
  "branch": "main",
  "runTests": true,
  "runLint": true,
  "useAI": false,
  "autoCommit": false,
  "autoPush": false,
  "testCommand": "npm run test",
  "lintCommand": "npm run lint",
  "watchIgnore": [
    "*.tmp",
    "build/**",
    "dist/**"
  ]
}
```

### Environment Variables

Create a `.env` file for OpenAI integration:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

## 📖 Usage

### Basic Commands

```bash
# Show enhanced git status
git-assist status

# Show repository information
git-assist info

# List branches
git-assist branch

# List remote branches
git-assist branch --remote

# Start intelligent file watcher
git-assist watch

# Show help
git-assist --help
```

### File Watcher Workflow

```bash
$ git-assist watch
👀 Git Assist - Enhanced File Watcher Started

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

## 🏗️ Project Structure

```
git-assist/
├── bin/
│   └── git-assist.js          # CLI entry point
├── src/
│   ├── index.js               # Core logic and commands
│   ├── watcher.js             # File watching functionality
│   ├── config.js              # Configuration management
│   ├── commit-message.js      # AI and template commit messages
│   ├── git-operations.js      # Git command wrappers
│   ├── test-runner.js         # Test and lint execution
│   └── user-interaction.js    # CLI user interaction
├── .gitassistrc.example       # Example configuration
├── .env.example               # Example environment variables
├── package.json               # Package configuration
└── README.md                  # Documentation
```

## 🔧 Development

### Adding New Commands

1. Open `src/index.js`
2. Add a new command in the `createCommand()` function
3. Implement the handler function

### Configuration Options

- **branch**: Target branch for pushes (default: "main")
- **runTests**: Run tests before committing (default: true)
- **runLint**: Run linting before committing (default: true)
- **useAI**: Use OpenAI for commit message generation (default: false)
- **autoCommit**: Automatically commit without user confirmation (default: false)
- **autoPush**: Automatically push without user confirmation (default: false)

## 📦 Publishing

To publish this CLI tool to npm:

```bash
npm login
npm publish
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details
