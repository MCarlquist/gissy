# Git Assist

An Open Source  CLI tool for enhanced git operations and repository management with automated workflows.

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
# Clone the repository
git clone <your-repo-url>
cd git-assist

# Install dependencies
npm install

# Link globally
npm link
```

After linking, you can use `git-assist` command from anywhere in your terminal.

### Local Development

```bash
# Clone the repository
git clone <your-repo-url>
cd git-assist

# Install dependencies
npm install

# Run locally
npm start
```

## ⚙️ Configuration

Create a `.gitassistrc` file in your project root to customize behavior:

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
    "temp/**"
  ]
}
```

### Configuration Options

- **branch**: Target branch for pushes (default: "main")
- **runTests**: Run tests before committing (default: true)
- **runLint**: Run linting before committing (default: true)
- **useAI**: Use OpenAI for commit message generation (default: false)
- **autoCommit**: Automatically commit without user confirmation (default: false)
- **autoPush**: Automatically push without user confirmation (default: false)
- **testCommand**: Command to run tests (default: "npm run test")
- **lintCommand**: Command to run linting (default: "npm run lint")
- **watchIgnore**: Additional patterns to ignore during file watching

### Environment Variables

For AI-powered commit messages, create a `.env` file:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

## 📖 Usage

### Basic Commands

```bash
# Show enhanced git status
git-assist status
git-assist s

# Show repository information
git-assist info
git-assist i

# List branches
git-assist branch
git-assist b

# Show remote branches
git-assist branch --remote
git-assist b -r

# Show all branches (local and remote)
git-assist branch --all
git-assist b -a

# Start intelligent file watcher
git-assist watch
git-assist w

# Watch with verbose output
git-assist watch --verbose
git-assist w -v

# Watch with custom ignore patterns
git-assist watch --ignore "*.tmp" "build/**"

# Show help
git-assist --help

# Show version
git-assist --version
```

### Smart File Watcher Workflow

The file watcher provides an automated development workflow:

1. **File Change Detection**: Monitors all files except ignored patterns
2. **Quality Checks**: Runs tests and linting automatically
3. **Commit Message Generation**: Creates intelligent commit messages (AI or template-based)
4. **User Confirmation**: Shows diff summary and asks for confirmation
5. **Git Operations**: Stages, commits, and pushes changes

```bash
$ git-assist watch
👀 Git Assist - Enhanced File Watcher Started

📁 Watching current directory for changes...
🚫 Ignoring: .git/**, node_modules/**, dist/**, .DS_Store, *.log, .env*, coverage/**

⚙️  Configuration:
   Tests: ✅
   Linting: ✅
   AI Commits: ❌
   Branch: main

📝 Modified: src/index.js
🔄 Processing file changes...

📋 Running quality checks...
🧪 Running tests...
✅ Tests passed
🔍 Running linter...
✅ Linting passed

✅ All quality checks passed!

💭 Generating commit message...
✅ AI commit message generated

📦 Ready to commit and push
──────────────────────────────────────────────────
📊 Changes: 15 lines added, 3 lines removed
💬 Commit message: "feat: add file watcher with automated workflow"
🌿 Target branch: main
──────────────────────────────────────────────────
Commit and push now? [Y/n] y

🚀 Starting git workflow...
📦 Staging all changes...
✅ All changes staged
💾 Committing changes...
✅ Changes committed
🚀 Pushing to main...
✅ Changes pushed

🎉 Successfully committed and pushed changes!
```

### Examples

#### Enhanced Status
```bash
$ git-assist status
🔍 Git Assist - Enhanced Status

📍 Current branch: main
📝 Changes detected:
   📝 src/index.js
   ➕ README.md
   ❓ new-file.txt

📤 Unpushed commits: 2
```

#### Repository Information
```bash
$ git-assist info
📊 Git Assist - Repository Information

📁 Repository: git-assist
🌐 Origin: https://github.com/username/git-assist.git
📍 Current branch: main
📝 Last commit: a1b2c3d - Add new feature (John Doe, 2 hours ago)
📈 Total commits: 42
```

#### Branch Management
```bash
$ git-assist branch
🌿 Git Assist - Branch Information

👉 main (current)
📍 feature/new-ui
📍 hotfix/bug-fix
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
│   └── user-interaction.js    # CLI user interaction utilities
├── .gitassistrc.example       # Example configuration
├── .env.example               # Example environment variables
├── package.json               # Package configuration
└── README.md                  # Documentation
```

## 🧩 Architecture

- **ES Modules**: Modern JavaScript module system
- **Commander.js**: Robust CLI framework
- **Chalk**: Terminal styling and colors
- **Chokidar**: Efficient file watching
- **OpenAI**: AI-powered commit message generation
- **Cosmiconfig**: Flexible configuration loading
- **Modular Design**: Clean separation of concerns

## 🔧 Development

### Adding New Commands

1. Open `src/index.js`
2. Add a new command in the `createCommand()` function:

```javascript
program
  .command('my-command')
  .description('Description of my command')
  .action(handleMyCommand);
```

3. Implement the handler function:

```javascript
async function handleMyCommand() {
  console.log(chalk.blue('My new command!'));
}
```

### File Watcher Configuration

The file watcher automatically ignores common directories and files:
- `.git/**` - Git repository files
- `node_modules/**` - Node.js dependencies
- `dist/**` - Build output
- `coverage/**` - Test coverage reports
- `*.log` - Log files
- `.env*` - Environment files

You can add custom ignore patterns using the `--ignore` option or in your `.gitassistrc`:

```bash
git-assist watch --ignore "*.tmp" "build/**" "custom-folder/**"
```

### Testing

```bash
# Run the CLI locally
npm start

# Test specific commands
npm start status
npm start info
npm start branch
npm start watch
```

## 📦 Publishing

To publish this CLI tool to npm:

1. Update package.json with your details
2. Build and test thoroughly
3. Publish to npm:

```bash
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

## 🔮 Future Features

- Interactive git operations
- Git workflow automation
- Repository health checks
- Integration with popular git hosting services
- Custom workflow templates
- Slack/Discord notifications
- Multi-repository management

---

Built with ❤️ using Node.js and modern CLI best practices.