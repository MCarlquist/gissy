# Gissy

<p align="center">
  <strong>A powerful CLI assistant to supercharge your Git workflow.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@exodus-tola-mindcoder/gissy"><img src="https://img.shields.io/npm/v/@exodus-tola-mindcoder/gissy.svg" alt="NPM Version"></a>
  <a href="https://github.com/exodus-tola-mindCoder/Git-Assist/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@exodus-tola-mindcoder/gissy.svg" alt="License"></a>
  <a href="https://github.com/exodus-tola-mindCoder/Git-Assist/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome"></a>
</p>

---

**Gissy** is a smart command-line tool designed to automate your repetitive Git tasks. From providing an enhanced `git status` to watching your files, running tests, and generating AI-powered commit messages, Gissy is your personal Git assistant.

## ✨ Key Features

-   **Enhanced Git Commands**: Clean, colorful, and informative outputs for `status`, `info`, and `branch` commands.
-   **Intelligent File Watcher**: Automatically detects file changes in your repository.
-   **Automated Workflow**: Runs your tests and linter, then stages, commits, and pushes your changes seamlessly.
-   **AI-Powered Commits**: Leverages OpenAI to generate meaningful and conventional commit messages from your code diffs.
-   **Highly Configurable**: Customize every part of the workflow using a simple `.gissyrc.json` file in your project.
-   **Zero-Config Ready**: Works out of the box with sensible defaults for most projects.

## 🛠️ Installation

Ensure you have **Node.js v16+** and **Git** installed.

```bash
npm install -g @exodus-tola-mindcoder/gissy
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


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details
