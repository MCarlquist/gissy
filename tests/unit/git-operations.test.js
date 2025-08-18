import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import { isGitRepository, getCurrentBranch, getRepoInfo, getBranches, getGitStatus, hasChanges, getDiffStats } from '../../src/git-operations.js';
import { execSync } from 'child_process';
import { existsSync, mkdirSync, rmdirSync, writeFileSync, unlinkSync } from 'fs';
import { join } from 'path';

describe('git-operations.js', () => {
  const testDir = join(process.cwd(), 'test-repo');

  beforeEach(() => {
    // Create a temporary test directory
    if (!existsSync(testDir)) {
      mkdirSync(testDir);
    }
    process.chdir(testDir);
    
    // Initialize git repo
    if (!existsSync('.git')) {
      execSync('git init');
      execSync('git config user.email "test@example.com"');
      execSync('git config user.name "Test User"');
    }
  });

  afterEach(() => {
    // Clean up
    process.chdir(join(__dirname, '../../'));
    if (existsSync(testDir)) {
      rmdirSync(testDir, { recursive: true });
    }
  });

  describe('isGitRepository', () => {
    test('should return true for git repository', () => {
      expect(isGitRepository()).toBe(true);
    });

    test('should return false for non-git directory', () => {
      const nonGitDir = join(process.cwd(), '../');
      process.chdir(nonGitDir);
      expect(isGitRepository()).toBe(false);
    });
  });

  describe('getCurrentBranch', () => {
    test('should return current branch name', () => {
      expect(getCurrentBranch()).toBe('main');
    });
  });

  describe('getRepoInfo', () => {
    test('should return repository information', () => {
      // Create a test file and commit
      writeFileSync('test.txt', 'test content');
      execSync('git add test.txt');
      execSync('git commit -m "Initial commit"');
      
      const info = getRepoInfo();
      expect(info).toBeTruthy();
      expect(info.name).toBe('test-repo');
      expect(info.branch).toBe('main');
    });
  });

  describe('getBranches', () => {
    test('should return branch list', () => {
      const branches = getBranches();
      expect(branches).toContain('main');
    });

    test('should return remote branches when remote=true', () => {
      const branches = getBranches({ remote: true });
      expect(typeof branches).toBe('string');
    });

    test('should return all branches when all=true', () => {
      const branches = getBranches({ all: true });
      expect(typeof branches).toBe('string');
    });
  });

  describe('getGitStatus', () => {
    test('should return git status', () => {
      writeFileSync('test.txt', 'test content');
      const status = getGitStatus();
      expect(status).toContain('test.txt');
    });
  });

  describe('hasChanges', () => {
    test('should return true when there are changes', () => {
      writeFileSync('test.txt', 'test content');
      expect(hasChanges()).toBe(true);
    });

    test('should return false when there are no changes', () => {
      // Clean working directory
      if (existsSync('test.txt')) {
        unlinkSync('test.txt');
      }
      expect(hasChanges()).toBe(false);
    });
  });

  describe('getDiffStats', () => {
    test('should return correct diff statistics', () => {
      const diff = `+ added line 1
+ added line 2
- removed line 1
- removed line 2
- removed line 3`;
      
      const stats = getDiffStats(diff);
      expect(stats.added).toBe(2);
      expect(stats.removed).toBe(3);
    });

    test('should return 0 for empty diff', () => {
      const stats = getDiffStats('');
      expect(stats.added).toBe(0);
      expect(stats.removed).toBe(0);
    });
  });
});
