import { execSync } from 'child_process';
import chalk from 'chalk';

/**
 * Stage all changes in the repository
 * @returns {Promise<boolean>} Success status
 */
export async function stageAll() {
  try {
    console.log(chalk.blue('📦 Staging all changes...'));
    execSync('git add .', { stdio: 'inherit' });
    console.log(chalk.green('✅ All changes staged'));
    return true;
  } catch (error) {
    console.error(chalk.red(`❌ Failed to stage changes: ${error.message}`));
    return false;
  }
}

/**
 * Commit changes with a message
 * @param {string} message - Commit message
 * @returns {Promise<boolean>} Success status
 */
export async function commit(message) {
  try {
    console.log(chalk.blue('💾 Committing changes...'));
    execSync(`git commit -m "${message.replace(/"/g, '\\"')}"`, { stdio: 'inherit' });
    console.log(chalk.green('✅ Changes committed'));
    return true;
  } catch (error) {
    console.error(chalk.red(`❌ Failed to commit: ${error.message}`));
    return false;
  }
}

/**
 * Push changes to remote repository
 * @param {string} branch - Branch to push to
 * @returns {Promise<boolean>} Success status
 */
export async function push(branch = 'main') {
  try {
    console.log(chalk.blue(`🚀 Pushing to ${branch}...`));
    execSync(`git push origin ${branch}`, { stdio: 'inherit' });
    console.log(chalk.green('✅ Changes pushed'));
    return true;
  } catch (error) {
    console.error(chalk.red(`❌ Failed to push: ${error.message}`));
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
    console.error(chalk.red(`❌ Failed to get diff: ${error.message}`));
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
    console.error(chalk.red(`❌ Failed to get diff: ${error.message}`));
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