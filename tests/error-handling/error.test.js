import { describe, test, expect } from '@jest/globals';
import { isGitRepository, getCurrentBranch, getRepoInfo } from '../../src/git-operations.js';
import { runTests, runLint } from '../../src/test-runner.js';
import { generateCommitMessage } from '../../src/commit-message.js';

describe('Error Handling Tests', () => {
  describe('git-operations.js error handling', () => {
    test('should handle non-git repository gracefully', () => {
      // Test in a non-git directory
      const originalCwd = process.cwd();
      process.chdir('/');
      
      expect(isGitRepository()).toBe(false);
      expect(getCurrentBranch()).toBe('');
      expect(getRepoInfo()).toBe(null);
      
      process.chdir(originalCwd);
    });

    test('should handle invalid git commands gracefully', () => {
      // These should not throw errors
      expect(() => getCurrentBranch()).not.toThrow();
      expect(() => getRepoInfo()).not.toThrow();
    });
  });

  describe('test-runner.js error handling', () => {
    test('should handle invalid test commands', async () => {
      const result = await runTests('invalid-command-that-does-not-exist');
      expect(result).toBe(false);
    });

    test('should handle invalid lint commands', async () => {
      const result = await runLint('invalid-command-that-does-not-exist');
      expect(result).toBe(false);
    });
  });

  describe('commit-message.js error handling', () => {
    test('should handle empty diff gracefully', async () => {
      const message = await generateCommitMessage('');
      expect(message).toBe('Update files');
    });

    test('should handle null diff gracefully', async () => {
      const message = await generateCommitMessage(null);
      expect(message).toBe('Update files');
    });

    test('should handle undefined diff gracefully', async () => {
      const message = await generateCommitMessage(undefined);
      expect(message).toBe('Update files');
    });
  });

  describe('config.js error handling', () => {
    test('should handle missing config files gracefully', () => {
      // This should not throw errors
      const { getConfig } = require('../../src/config.js');
      expect(() => getConfig()).not.toThrow();
    });
  });
});
