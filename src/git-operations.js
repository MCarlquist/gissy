import { execSync, spawnSync } from 'child_process';
import chalk from 'chalk';

/**
 * Check if the current directory is a git repository.
 * @returns {boolean}
 */
export function isGitRepository() {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore', encoding: 'utf-8' });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Get the name of the current git branch.
 * @returns {string} The current branch name, or empty string if not in a git repository.
 */
export function getCurrentBranch() {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
  } catch (error) {
    // This can happen if not in a git repo or in a detached HEAD state
    return '';
  }
}

/**
 * Get the number of unpushed commits for the current branch.
 * @returns {number|null} The number of unpushed commits, or null if no upstream is configured.
 */
export function getUnpushedCommitsCount() {
  try {
    // This command will fail if there is no upstream branch, which is what we want to check.
    const result = execSync('git rev-list --count @{u}..HEAD', { encoding: 'utf-8', stdio: 'pipe' });
    return parseInt(result.trim(), 10);
  } catch (error) {
    // This error typically means no upstream is configured for the current branch.
    return null;
  }
}

/**
 * Get information about the repository.
 * @returns {object|null} An object with repository info, or null on error.
 */
export function getRepoInfo() {
  if (!isGitRepository()) {
    return null;
  }
  try {
    const repoUrl = execSync('git remote get-url origin', { encoding: 'utf-8' }).trim();
    const repoName = repoUrl.split('/').pop().replace('.git', '');
    const branch = getCurrentBranch();
    // Using a custom format for a clean, one-line output.
    const lastCommit = execSync("git log -1 --pretty=format:'%h - %s (%an, %ar)'", { encoding: 'utf-8' }).trim();
    const totalCommits = execSync('git rev-list --all --count', { encoding: 'utf-8' }).trim();

    return {
      name: repoName,
      origin: repoUrl,
      branch,
      lastCommit,
      totalCommits: parseInt(totalCommits, 10),
    };
  } catch (error) {
    console.error(chalk.red(`❌ Failed to get repository info: ${error.message}`));
    return null;
  }
}

/**
 * Get a list of local, remote, or all branches.
 * @param {object} [options={}] - Options object.
 * @param {boolean} [options.remote=false] - Show remote branches.
 * @param {boolean} [options.all=false] - Show all (local and remote) branches.
 * @returns {string} A string containing the list of branches.
 */
export function getBranches(options = {}) {
  const { remote = false, all = false } = options;
  // Sort by most recent commit date for better UX
  let command = 'git branch --sort=-committerdate';
  if (all) {
    command = 'git branch -a --sort=-committerdate';
  } else if (remote) {
    command = 'git branch -r --sort=-committerdate';
  }

  try {
    return execSync(command, { encoding: 'utf-8' }).trim();
  } catch (error) {
    console.error(chalk.red(`❌ Failed to get branches: ${error.message}`));
    return '';
  }
}

/**
 * Stage all changes in the repository
 * @returns {boolean} Success status
 */
export function stageAll() {
  try {
    console.log(chalk.blue('📦 Staging all changes...'));
    execSync('git add .', { stdio: 'inherit' });
    console.log(chalk.green('✅ All changes staged'));
    return true;
  } catch (error) {
    console.error(chalk.red(`❌ Failed to stage changes:\n${error.message}`));
    return false;
  }
}

/**
 * Commit changes with a message
 * @param {string} message - Commit message
 * @returns {boolean} Success status
 */
export function commit(message) {
  try {
    console.log(chalk.blue('💾 Committing changes...'));
    // Use spawnSync to avoid command injection vulnerabilities with the commit message.
    const result = spawnSync('git', ['commit', '-m', message], { encoding: 'utf-8' });

    if (result.status !== 0) {
      throw new Error(result.stderr || result.stdout);
    }

    console.log(result.stdout);
    console.log(chalk.green('✅ Changes committed'));
    return true;
  } catch (error) {
    const errorMessage = error.message || '';
    if (errorMessage.includes('nothing to commit')) {
      console.log(chalk.yellow('🤷 No changes to commit.'));
    } else {
      console.error(chalk.red(`❌ Failed to commit:\n${errorMessage}`));
    }
    return false;
  }
}

/**
 * Get git diff for staged changes
 * @returns {string} Git diff output
 */
export function getStagedDiff() {
  try {
    return execSync('git diff --cached', { encoding: 'utf-8' });
  } catch (error) {
    console.error(chalk.red(`❌ Failed to get staged diff: ${error.message}`));
    return '';
  }
}

/**
 * Get git diff for unstaged changes
 * @returns {string} Git diff output
 */
export function getUnstagedDiff() {
  try {
    return execSync('git diff', { encoding: 'utf-8' });
  } catch (error) {
    console.error(chalk.red(`❌ Failed to get unstaged diff: ${error.message}`));
    return '';
  }
}

/**
 * Push changes to remote repository
 * @param {string} branch - Branch to push to
 * @returns {boolean} Success status
 */
export function push(branch = 'main') {
  try {
    console.log(chalk.blue(`🚀 Pushing to ${branch}...`));
    // Use spawnSync for safer argument handling.
    const result = spawnSync('git', ['push', 'origin', branch], { encoding: 'utf-8' });
    if (result.status !== 0) {
      throw new Error(result.stderr);
    }
    console.log(result.stdout);
    console.log(chalk.green('✅ Changes pushed'));
    return true;
  } catch (error) {
    console.error(chalk.red(`❌ Failed to push:\n${error.message}`));
    return '';
  }
}

/**
 * Get git status in short format
 * @returns {string} Git status output
 */
export function getGitStatus() {
  try {
    return execSync('git status --porcelain', { encoding: 'utf-8' });
  } catch (error) {
    console.error(chalk.red(`❌ Failed to get status: ${error.message}`));
    return '';
  }
}

/**
 * Check if there are any changes to commit
 * @returns {boolean} True if there are changes
 */
export function hasChanges() {
  const status = getGitStatus();
  return status.trim().length > 0;
}

/**
 * Get diff statistics
 * @param {string} diff - Git diff output
 * @returns {Object} Statistics object with added and removed lines
 */
export function getDiffStats(diff) {
  if (!diff) return { added: 0, removed: 0 };

  const lines = diff.split('\n');
  let added = 0;
  let removed = 0;

  for (const line of lines) {
    if (line.startsWith('+') && !line.startsWith('+++')) {
      added++;
    } else if (line.startsWith('-') && !line.startsWith('---')) {
      removed++;
    }
  }

  return { added, removed };
}
