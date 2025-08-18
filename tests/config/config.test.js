import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import { existsSync, writeFileSync, unlinkSync } from 'fs';
import { join } from 'path';

describe('config.js', () => {
  const testDir = join(__dirname, '../../test-config');
  const configFile = join(testDir, '.gissyrc.json');
  const oldConfigFile = join(testDir, '.gitassistrc');

  beforeEach(() => {
    // Create test directory
    if (!existsSync(testDir)) {
      require('fs').mkdirSync(testDir, { recursive: true });
    }
  });

  afterEach(() => {
    // Clean up config files
    if (existsSync(configFile)) {
      unlinkSync(configFile);
    }
    if (existsSync(oldConfigFile)) {
      unlinkSync(oldConfigFile);
    }
  });

  test('should load default configuration', () => {
    const { getConfig } = require('../../src/config.js');
    const config = getConfig();
    
    expect(config).toBeDefined();
    expect(config.branch).toBe('main');
    expect(config.runTests).toBe(true);
    expect(config.runLint).toBe(true);
    expect(config.useAI).toBe(false);
  });

  test('should load configuration from .gissyrc.json', () => {
    const testConfig = {
      branch: 'develop',
      runTests: false,
      useAI: true,
      testCommand: 'npm run test:unit'
    };
    
    writeFileSync(configFile, JSON.stringify(testConfig, null, 2));
    
    // Change to test directory
    const originalCwd = process.cwd();
    process.chdir(testDir);
    
    const { getConfig } = require('../../src/config.js');
    const config = getConfig();
    
    expect(config.branch).toBe('develop');
    expect(config.runTests).toBe(false);
    expect(config.useAI).toBe(true);
    expect(config.testCommand).toBe('npm run test:unit');
    
    process.chdir(originalCwd);
  });

  test('should merge user config with defaults', () => {
    const testConfig = {
      branch: 'feature/test',
      runTests: false
    };
    
    writeFileSync(configFile, JSON.stringify(testConfig, null, 2));
    
    const originalCwd = process.cwd();
    process.chdir(testDir);
    
    const { getConfig } = require('../../src/config.js');
    const config = getConfig();
    
    expect(config.branch).toBe('feature/test');
    expect(config.runTests).toBe(false);
    expect(config.runLint).toBe(true); // Should use default
    expect(config.useAI).toBe(false); // Should use default
    
    process.chdir(originalCwd);
  });

  test('should handle missing config file gracefully', () => {
    const originalCwd = process.cwd();
    process.chdir(testDir);
    
    const { getConfig } = require('../../src/config.js');
    const config = getConfig();
    
    expect(config).toBeDefined();
    expect(config.branch).toBe('main'); // Should use default
    
    process.chdir(originalCwd);
  });
});
